import { Link } from "@tanstack/react-router";
import { holdings } from "@/data/group";

const companyLinks = [
  { to: "/about", label: "The Group" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/approach", label: "Our Vision" },
  { to: "/insights", label: "Perspectives" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-onyx">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_.7fr_.9fr]">
          <div>
            <Link to="/" aria-label="Martins Investments — home" className="inline-flex">
              <img
                src="/footer-logo.png"
                alt="Martins Investments"
                className="h-auto w-48 object-contain brightness-110 contrast-105 drop-shadow-sm"
              />
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Martins Investments is an independent holding company building, backing and developing
              businesses with long-term potential.
            </p>
          </div>
          <div>
            <p className="eyebrow">Company</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Core holdings</p>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              {holdings.map((holding) => (
                <li key={holding.slug}>
                  <Link to="/portfolio" className="transition-colors hover:text-gold">
                    <span className="text-foreground">{holding.name}</span>
                    <br />
                    <span className="whitespace-nowrap text-xs">
                      {holding.slug === "roc-away"
                        ? "Restaurant · Lounge · Travel · Lifestyle"
                        : holding.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 rule-gold" />
        <div className="mt-8 flex flex-col gap-3 text-xs tracking-[0.12em] uppercase text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Martins Investments. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-gold">
              Privacy
            </Link>
            <Link to="/cookies" className="transition-colors hover:text-gold">
              Cookies
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("martins-open-cookie-settings"))}
              className="text-left transition-colors hover:text-gold"
            >
              Cookie settings
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
