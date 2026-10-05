import { useCallback, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getServerSnapshot() {
  return false;
}

export function useScrolledPast(viewportRatio = 0.85): boolean {
  const getSnapshot = useCallback(
    () => window.scrollY > window.innerHeight * viewportRatio,
    [viewportRatio],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}