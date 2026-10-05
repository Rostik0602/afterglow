import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Blogger, Post } from "@/types/blogger";

function groupDigits(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

interface PostItemProps {
  post: Post;
  blogger: Blogger;
}

function PostItem({ post, blogger }: PostItemProps) {
  const [liked, setLiked] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <article className="rounded-3xl border border-line bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src={blogger.portrait.src}
            alt=""
            fill
            sizes="36px"
            className="object-cover"
            style={{ objectPosition: blogger.portrait.position }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{blogger.name}</p>
          <p className="truncate text-xs text-muted">
            @{blogger.handle} · {post.timeAgo}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-fg/90">{post.text}</p>

      <div className="mt-3 -ml-3 flex items-center text-sm text-muted">
        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          aria-pressed={liked}
          aria-label={`Подобається: ${groupDigits(likes)}`}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-full px-3 transition-colors hover:bg-white/5",
            liked && "text-accent",
          )}
        >
          <motion.span
            key={String(liked)}
            initial={{ scale: liked ? 0.5 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 14 }}
            className="inline-flex"
          >
            <Heart className={cn("size-4.5", liked && "fill-current")} />
          </motion.span>
          {groupDigits(likes)}
        </button>

        <span className="inline-flex h-9 items-center gap-1.5 px-3">
          <MessageCircle className="size-4.5" />
          {groupDigits(post.comments)}
        </span>
      </div>
    </article>
  );
}

interface PostListProps {
  blogger: Blogger;
  className?: string;
}

export function PostList({ blogger, className }: PostListProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {blogger.posts.map((post) => (
        <li key={post.id}>
          <PostItem post={post} blogger={blogger} />
        </li>
      ))}
    </ul>
  );
}