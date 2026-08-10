import { Link } from "@tanstack/react-router";
import { sectors } from "@/data/group";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-onyx">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <p className="font-display text-xl tracking-[0.26em] uppercase">
              Martins
            </p>
            <p className="eyebrow mt-2">Investments</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A privately held investment group building and operating a
              portfolio of businesses across consumer, property, mobility and
              media.
            </p>
          </div>

          <div>
            <p className="eyebrow">Group</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                { to: "/about", label: "About" },
                { to: "/portfolio", label: "Our Portfolio" },
                { to: "/businesses", label: "Our Businesses" },
                { to: "/approach", label: "Our Approach" },
                { to: "/insights", label: "News & Insights" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Business areas</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/portfolio/$sector"
                    params={{ sector: s.slug }}
                    className="transition-colors hover:text-gold"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 rule-gold" />
        <div className="mt-8 flex flex-col gap-3 text-xs tracking-[0.12em] uppercase text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Martins Investments. All rights reserved.</p>
          <p>Holding company · Portfolio of businesses &amp; ventures</p>
        </div>
      </div>
    </footer>
  );
}
