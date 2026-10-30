import { useCallback, useSyncExternalStore } from "react";

export const FREE_MESSAGES_PER_DAY = 5;

const STORAGE_KEY = "afterglow:messages";
const CHANGE_EVENT = "afterglow:messages-change";

interface DailyUsage {
  date: string;
  used: number;
}

let memoryUsage: DailyUsage | null = null;

function today(): string {
  return new Date().toLocaleDateString("en-CA");
}

function readUsage(): DailyUsage | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DailyUsage) : null;
  } catch {
    return memoryUsage;
  }
}

function writeUsage(usage: DailyUsage) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch {
    memoryUsage = usage;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function getUsedToday(): number {
  const usage = readUsage();
  if (!usage || usage.date !== today() || typeof usage.used !== "number") return 0;
  return Math.max(0, usage.used);
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getServerSnapshot() {
  return 0;
}

export function useMessageLimit() {
  const used = useSyncExternalStore(subscribe, getUsedToday, getServerSnapshot);
  const remaining = Math.max(0, FREE_MESSAGES_PER_DAY - used);

  const consume = useCallback(() => {
    const current = getUsedToday();
    if (current >= FREE_MESSAGES_PER_DAY) return false;

    writeUsage({ date: today(), used: current + 1 });
    return true;
  }, []);

  return {
    used,
    remaining,
    isLimitReached: remaining === 0,
    consume,
  };
}