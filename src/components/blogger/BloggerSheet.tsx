"use client";

import { useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useDragControls,
  type MotionProps,
  type PanInfo,
} from "motion/react";
import { X } from "lucide-react";
import { ProfileHeader } from "@/components/blogger/ProfileHeader";
import { ProfileTabs } from "@/components/blogger/ProfileTabs";
import { content } from "@/data/site";
import { useActiveBlogger } from "@/hooks/useActiveBlogger";

const DESKTOP_QUERY = "(min-width: 640px)";
const CLOSE_OFFSET = 120;
const CLOSE_VELOCITY = 600;

function subscribeToQuery(callback: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToQuery,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

const mobileMotion: MotionProps = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { type: "spring", damping: 34, stiffness: 320 } },
  exit: { y: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

const desktopMotion: MotionProps = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2 } },
};

export function BloggerSheet() {
  const { blogger, close } = useActiveBlogger();
  const isDesktop = useIsDesktop();
  const dragControls = useDragControls();

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > CLOSE_OFFSET || info.velocity.y > CLOSE_VELOCITY) close();
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    dragControls.start(event);
  }

  return (
    <Dialog.Root
      open={Boolean(blogger)}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {blogger && (
            <Dialog.Portal key="blogger-sheet" forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild forceMount>
                <motion.div
                  {...(isDesktop ? desktopMotion : mobileMotion)}
                  drag={isDesktop ? false : "y"}
                  dragControls={dragControls}
                  dragListener={false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 0.6 }}
                  onDragEnd={handleDragEnd}
                  style={{ "--accent": blogger.accent } as CSSProperties}
                  className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[28px] border border-b-0 border-line bg-ink shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.8)] outline-none sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[88dvh] sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px] sm:border-b sm:shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
                >
                  <div
                    onPointerDown={startDrag}
                    className="absolute inset-x-0 top-0 z-10 flex h-16 cursor-grab touch-none justify-center pt-2.5 active:cursor-grabbing sm:hidden"
                  >
                    <span className="h-1.5 w-11 rounded-full bg-white/50 shadow-[0_1px_4px_rgb(0_0_0/0.4)]" />
                  </div>

                  <Dialog.Close
                    aria-label={content.profile.close}
                    className="glass absolute top-4 right-4 z-20 grid size-10 place-items-center rounded-full border border-white/10 text-fg transition-colors hover:bg-white/15"
                  >
                    <X className="size-5" />
                  </Dialog.Close>

                  <div key={blogger.id} className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-safe">
                    <ProfileHeader blogger={blogger} />
                    <ProfileTabs blogger={blogger} className="px-5 pt-6 pb-4" />
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </MotionConfig>
    </Dialog.Root>
  );
}