import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { bloggers } from "@/data/bloggers";
import { content, siteConfig } from "@/data/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const response = await fetch(match[1]);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function loadPortrait(src: string): Promise<string> {
  const file = await readFile(join(process.cwd(), "public", src));
  const type = src.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const { hero, telegramCta } = content;
  const brand = siteConfig.name.toLowerCase();

  const [display, body, portraits] = await Promise.all([
    loadGoogleFont("Unbounded", 600, `${brand}${hero.title}${hero.titleAccent}`),
    loadGoogleFont("Onest", 500, `${hero.eyebrow}${telegramCta.cta}`),
    Promise.all(bloggers.map((blogger) => loadPortrait(blogger.portrait.src))),
  ]);

  const fonts = [
    display && { name: "Unbounded", data: display, weight: 600 as const, style: "normal" as const },
    body && { name: "Onest", data: body, weight: 500 as const, style: "normal" as const },
  ].filter((font) => font !== null);

  const columns = [0, 1].map((column) =>
    bloggers
      .map((blogger, index) => ({ blogger, portrait: portraits[index] }))
      .filter((_, index) => index % 2 === column),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: 64,
          background: "#07070a",
          color: "#f5f5f7",
          fontFamily: "Onest",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -300,
            left: -220,
            width: 800,
            height: 800,
            display: "flex",
            background: "radial-gradient(circle, rgba(167,139,250,0.32) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -340,
            right: -180,
            width: 860,
            height: 860,
            display: "flex",
            background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 65%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 620,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="44" height="44" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  id="og-gradient"
                  x1="7"
                  y1="7"
                  x2="25"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
                <mask id="og-mask">
                  <rect width="32" height="32" fill="#fff" />
                  <circle cx="19" cy="13" r="9.2" fill="#000" />
                </mask>
              </defs>
              <circle cx="16" cy="16" r="11" fill="url(#og-gradient)" mask="url(#og-mask)" />
            </svg>
            <div style={{ display: "flex", fontFamily: "Unbounded", fontSize: 30, fontWeight: 600 }}>
              {brand}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 22, color: "#a1a1ae" }}>{hero.eyebrow}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
                fontFamily: "Unbounded",
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: -1.5,
              }}
            >
              <span>{hero.title}</span>
              <span style={{ color: "#a78bfa" }}>{hero.titleAccent}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              padding: "16px 28px",
              borderRadius: 9999,
              background: "#2aabee",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 500,
              boxShadow: "0 12px 40px -8px rgba(42,171,238,0.7)",
            }}
          >
            <TelegramIcon width={26} height={26} fill="#ffffff" />
            {telegramCta.cta}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginLeft: "auto" }}>
          {columns.map((items, column) => (
            <div
              key={column}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: column === 1 ? 40 : 0,
              }}
            >
              {items.map(({ blogger, portrait }) => (
                <div
                  key={blogger.id}
                  style={{
                    display: "flex",
                    width: 196,
                    height: 222,
                    borderRadius: 28,
                    overflow: "hidden",
                    border: "2px solid rgba(255,255,255,0.12)",
                    boxShadow: `0 0 44px -12px ${blogger.accent}`,
                  }}
                >
                  <img
                    src={portrait}
                    alt=""
                    width={196}
                    height={222}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}