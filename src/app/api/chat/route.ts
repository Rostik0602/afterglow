import { google, type GoogleLanguageModelOptions } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { getBloggerById } from "@/data/bloggers";
import { buildPersonaPrompt } from "@/lib/ai/personaPrompt";

export const maxDuration = 30;

const MODEL_ID = process.env.GEMINI_MODEL ?? "gemini-3.6-flash";
const MAX_USER_MESSAGES = 5;
const MAX_HISTORY = 12;
const MAX_TEXT_LENGTH = 500;
const CHAT_CONTEXT = "Привітання вже було на початку чату, тому не вітайся повторно.";

const partSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
});

const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(partSchema),
});

const bodySchema = z.object({
  bloggerId: z.string(),
  messages: z.array(messageSchema).min(1).max(40),
});

type IncomingMessage = z.infer<typeof messageSchema>;

function toHistory(messages: IncomingMessage[]): UIMessage[] {
  const history = messages
    .map((message) => ({
      id: message.id,
      role: message.role,
      parts: message.parts.flatMap((part) =>
        part.type === "text" && part.text
          ? [{ type: "text" as const, text: part.text.slice(0, MAX_TEXT_LENGTH) }]
          : [],
      ),
    }))
    .filter((message) => message.parts.length > 0)
    .slice(-MAX_HISTORY);

  const firstUserIndex = history.findIndex((message) => message.role === "user");
  return firstUserIndex === -1 ? [] : history.slice(firstUserIndex);
}

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return errorResponse("invalid_request", 400);

  const { bloggerId, messages } = parsed.data;

  const blogger = getBloggerById(bloggerId);
  if (!blogger) return errorResponse("unknown_blogger", 404);

  const userMessages = messages.filter((message) => message.role === "user").length;
  if (userMessages > MAX_USER_MESSAGES) return errorResponse("limit_reached", 429);

  const history = toHistory(messages);
  if (history.length === 0) return errorResponse("invalid_request", 400);

  const result = streamText({
    model: google(MODEL_ID),
    system: [buildPersonaPrompt(blogger), CHAT_CONTEXT].join("\n"),
    messages: await convertToModelMessages(history),
    maxOutputTokens: 300,
    temperature: 0.8,
    maxRetries: 1,
    providerOptions: {
      google: {
        thinkingConfig: MODEL_ID.startsWith("gemini-2.5")
          ? { thinkingBudget: 0 }
          : { thinkingLevel: "minimal" },
      } satisfies GoogleLanguageModelOptions,
    },
    onError({ error }) {
      console.error("[chat]", error);
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}