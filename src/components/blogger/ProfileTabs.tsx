import { useId, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { DemoChat } from "@/components/blogger/DemoChat";
import { PostList } from "@/components/blogger/PostList";
import { content } from "@/data/site";
import { cn } from "@/lib/cn";
import type { Blogger } from "@/types/blogger";

type TabId = "chat" | "posts";

const TABS: TabId[] = ["chat", "posts"];

interface ProfileTabsProps {
  blogger: Blogger;
  className?: string;
}

export function ProfileTabs({ blogger, className }: ProfileTabsProps) {
  const [active, setActive] = useState<TabId>("chat");
  const baseId = useId();

  const tabId = (tab: TabId) => `${baseId}-tab-${tab}`;
  const panelId = (tab: TabId) => `${baseId}-panel-${tab}`;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(TABS.indexOf(active) + step + TABS.length) % TABS.length];

    setActive(next);
    document.getElementById(tabId(next))?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={blogger.name}
        onKeyDown={handleKeyDown}
        className="grid grid-cols-2 rounded-full border border-line bg-white/3 p-1"
      >
        {TABS.map((tab) => {
          const selected = tab === active;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              id={tabId(tab)}
              aria-selected={selected}
              aria-controls={panelId(tab)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab)}
              className={cn(
                "relative h-10 rounded-full text-sm font-medium transition-colors duration-200",
                selected ? "text-ink" : "text-muted hover:text-fg",
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-fg"
                />
              )}
              <span className="relative">{content.profile.tabs[tab]}</span>
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => (
        <div
          key={tab}
          role="tabpanel"
          id={panelId(tab)}
          aria-labelledby={tabId(tab)}
          hidden={tab !== active}
          className="mt-4"
        >
          {tab === "chat" ? <DemoChat blogger={blogger} /> : <PostList blogger={blogger} />}
        </div>
      ))}
    </div>
  );
}