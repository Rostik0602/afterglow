import { Container } from "@/components/ui/Container";
import { content, siteConfig } from "@/data/site";

export function Footer() {
  const { footer } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="size-6">
              <defs>
                <linearGradient
                  id="footer-logo-gradient"
                  x1="7"
                  y1="7"
                  x2="25"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
                <mask id="footer-logo-mask">
                  <rect width="32" height="32" fill="#fff" />
                  <circle cx="19" cy="13" r="9.2" fill="#000" />
                </mask>
              </defs>
              <circle
                cx="16"
                cy="16"
                r="11"
                fill="url(#footer-logo-gradient)"
                mask="url(#footer-logo-mask)"
              />
            </svg>
            <span className="font-display text-sm font-semibold tracking-tight lowercase">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">{footer.note}</p>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-subtle sm:text-right">
          {footer.disclaimer}
        </p>
      </Container>

      <Container>
        <p className="border-t border-line pt-6 text-xs text-subtle">
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}