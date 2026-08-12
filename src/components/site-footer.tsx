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
              Martins Investments is a private holding company building and backing exceptional
              businesses and future ventures.
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
                    <span className="text-xs">{holding.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 rule-gold" />
        <div className="mt-8 flex flex-col gap-3 text-xs tracking-[0.12em] uppercase text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Martins Investments. All rights reserved.</p>
          <p>INVESTING TODAY. BUILDING TOMORROW.</p>
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/2348031975415/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground/70 transition-colors hover:text-gold"
          >
            <span>Digital craftsmanship by</span>
            <span className="border-b border-gold/35 pb-0.5 text-gold transition-colors group-hover:border-gold">
              Bevilon
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
