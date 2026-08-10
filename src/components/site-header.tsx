import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "The Group" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/approach", label: "Our Vision" },
  { to: "/insights", label: "Perspectives" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = location.pathname === "/";
  const useSolidHeader = !isHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        useSolidHeader
          ? "border-b border-border bg-onyx/95 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          className={`group flex flex-col leading-none transition-colors ${
            useSolidHeader ? "text-foreground" : "text-white"
          }`}
        >
          <span className="font-display text-lg tracking-[0.32em] uppercase">MI</span>
          <span className="mt-1 text-[0.54rem] tracking-[0.25em] uppercase text-gold">
            Martins Investments
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-gold" }}
              inactiveProps={{
                className: useSolidHeader ? "text-muted-foreground" : "text-white/82",
              }}
              activeOptions={{ exact: item.to === "/" }}
              className="text-[0.8rem] tracking-[0.14em] uppercase transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-gold lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-onyx px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-sm tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
