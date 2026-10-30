import Link from "next/link";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { Button, buttonClasses } from "@/components/ui/Button";
import { content } from "@/data/site";

interface ChatLimitCardProps {
  telegramLink: string;
}

export function ChatLimitCard({ telegramLink }: ChatLimitCardProps) {
  return (
    <div className="rounded-2xl border border-accent/25 bg-accent/5 p-4">
      <p className="text-sm font-semibold">{content.chat.limitTitle}</p>
      <p className="mt-1 text-sm text-muted">{content.chat.limitText}</p>

      <div className="mt-4 flex flex-col gap-2">
        <Button
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="telegram"
          className="w-full"
        >
          <TelegramIcon />
          {content.chat.cta}
        </Button>
        <Link
          href="/pricing"
          className={buttonClasses({ variant: "secondary", className: "w-full" })}
        >
          {content.chat.pricingCta}
        </Link>
      </div>
    </div>
  );
}