import { useSearchParams } from "next/navigation";
import { getBloggerById } from "@/data/bloggers";

const PARAM = "blogger";

let openedByPush = false;

function buildUrl(params: URLSearchParams): string {
  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
}

export function openBlogger(id: string) {
  const params = new URLSearchParams(window.location.search);
  const alreadyOpen = params.has(PARAM);
  params.set(PARAM, id);
  const url = buildUrl(params);

  if (alreadyOpen) {
    window.history.replaceState(null, "", url);
    return;
  }

  window.history.pushState(null, "", url);
  openedByPush = true;
}

export function closeBlogger() {
  if (openedByPush) {
    openedByPush = false;
    window.history.back();
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.delete(PARAM);
  window.history.replaceState(null, "", buildUrl(params));
}

export function useActiveBlogger() {
  const searchParams = useSearchParams();
  const blogger = getBloggerById(searchParams.get(PARAM));

  return { blogger, close: closeBlogger };
}