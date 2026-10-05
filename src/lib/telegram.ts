import { siteConfig } from "@/data/site";

const MAX_START_LENGTH = 64;
const MAX_SOURCE_LENGTH = 24;
const SEPARATOR = "__";
const DEFAULT_TARGET = "landing";

interface TelegramLinkOptions {
  bloggerId?: string;
  source?: string | null;
}

function sanitize(value: string, maxLength: number): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, maxLength);
}

export function buildTelegramLink({ bloggerId, source }: TelegramLinkOptions = {}): string {
  const target = sanitize(bloggerId ?? "", MAX_START_LENGTH) || DEFAULT_TARGET;
  const origin = source ? sanitize(source, MAX_SOURCE_LENGTH) : "";
  const start = [target, origin].filter(Boolean).join(SEPARATOR).slice(0, MAX_START_LENGTH);

  return `https://t.me/${siteConfig.telegramBot}?start=${start}`;
}