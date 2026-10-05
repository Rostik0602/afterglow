import type { NicheFilterValue } from "@/types/blogger";

export const siteConfig = {
  name: "Afterglow",
  title: "Afterglow — AI-блогери, з якими можна поговорити",
  description:
    "Вітрина віртуальних блогерів: чотири AI-персонажі з власним стилем і характером. Познайомся, поспілкуйся в демо-чаті та продовжуй розмову в Telegram.",
  locale: "uk_UA",
  telegramBot: "afterglow_ai_bot",
} as const;

export const nicheLabels: Record<NicheFilterValue, string> = {
  all: "Усі",
  tech: "Технології",
  travel: "Подорожі",
  fashion: "Мода",
  lifestyle: "Лайфстайл",
};

export const content = {
  header: {
    cta: "Telegram",
  },
  hero: {
    eyebrow: "AI-персонажі нового покоління",
    title: "AI-блогери,",
    titleAccent: "які відповідають тобі.",
    subtitle:
      "Чотири AI-персонажі з власним характером, стилем та історією. Обирай, знайомся й продовжуй розмову в Telegram — вони на зв’язку 24/7.",
    primaryCta: { label: "Обрати персонажа", href: "#catalog" },
    secondaryCta: "Перейти в Telegram",
    stats: [
      { value: "24/7", label: "на зв’язку" },
      { value: "4", label: "персонажі" },
      { value: "<1 хв", label: "до відповіді" },
    ],
  },
  catalog: {
    id: "catalog",
    eyebrow: "Каталог",
    title: "Обери свого персонажа",
    subtitle: "Кожен — окремий світ: свої інтереси, манера спілкування та настрій.",
    empty: "У цій категорії поки нікого немає",
  },
  card: {
    cta: "Дивитися блог",
    online: "онлайн",
  },
  profile: {
    close: "Закрити",
    online: "онлайн",
    stats: {
      followers: "підписників",
      posts: "публікацій",
      chats: "розмов",
    },
    tabs: {
      chat: "Чат",
      posts: "Пости",
    },
  },
  chat: {
    typing: "друкує…",
    hint: "Обери відповідь",
    note: "Демо-діалог · повна розмова в Telegram",
    cta: "Продовжити в Telegram",
    restart: "Почати спочатку",
  },
  howItWorks: {
    eyebrow: "Як це працює",
    title: "Три кроки до розмови",
    steps: [
      {
        title: "Обери персонажа",
        text: "Гортай каталог і знаходь того, чий стиль і теми тобі близькі.",
      },
      {
        title: "Познайомся",
        text: "Відкрий профіль і поспілкуйся в демо-чаті просто на сайті.",
      },
      {
        title: "Продовжуй у Telegram",
        text: "Персонаж уже чекає на тебе — без реєстрації, у будь-який час.",
      },
    ],
  },
  telegramCta: {
    title: "Твій персонаж уже онлайн",
    subtitle:
      "Переходь у Telegram і продовжуй розмову там, де тобі зручно. Без реєстрації та завантажень.",
    cta: "Перейти в Telegram",
  },
  stickyBar: {
    cta: "Перейти в Telegram",
  },
  footer: {
    disclaimer:
      "Усі персонажі згенеровані штучним інтелектом. Будь-які збіги з реальними людьми випадкові.",
    note: "Демо-прототип вітрини AI-персонажів",
  },
} as const;