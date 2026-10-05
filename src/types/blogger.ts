export type Niche = "tech" | "travel" | "fashion" | "lifestyle";

export type NicheFilterValue = Niche | "all";

export interface BloggerPortrait {
  src: string;
  alt: string;
  position?: string;
}

export interface BloggerStats {
  followers: number;
  posts: number;
  chats: number;
}

export type ChatAuthor = "blogger" | "user";

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  text: string;
}

export interface QuickReply {
  id: string;
  label: string;
  answer: string[];
}

export interface ChatScript {
  greeting: string[];
  replies: QuickReply[];
  outro: string[];
}

export interface Post {
  id: string;
  text: string;
  timeAgo: string;
  likes: number;
  comments: number;
}

export interface Blogger {
  id: string;
  name: string;
  handle: string;
  niche: Niche;
  tagline: string;
  bio: string;
  location: string;
  accent: string;
  portrait: BloggerPortrait;
  stats: BloggerStats;
  tags: string[];
  chat: ChatScript;
  posts: Post[];
}