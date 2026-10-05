import { useSyncExternalStore } from "react";

const STORAGE_KEY = "afterglow:src";
const PARAM_KEYS = ["src", "utm_source"] as const;

let cachedSource: string | null | undefined;

function resolveSource(): string | null {
  if (cachedSource !== undefined) return cachedSource;

  const params = new URLSearchParams(window.location.search);
  const fromUrl = PARAM_KEYS.map((key) => params.get(key)).find(Boolean) ?? null;

  try {
    if (fromUrl) sessionStorage.setItem(STORAGE_KEY, fromUrl);
    cachedSource = fromUrl ?? sessionStorage.getItem(STORAGE_KEY);
  } catch {
    cachedSource = fromUrl;
  }

  return cachedSource;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

export function useTrafficSource(): string | null {
  return useSyncExternalStore(subscribe, resolveSource, getServerSnapshot);
}