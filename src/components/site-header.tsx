import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/approach", label: "Our Vision" },
  { to: "/insights", label: "Perspectives" },
  { to: "/contact", label: "Contact" },
] as const;

const groupNav = [{ to: "/founder", label: "Founder" }] as const;

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
          aria-label="Martins Investments — home"
          className="group flex shrink-0 transition-transform hover:scale-[1.01]"
        >
          <img
            src="/logo.png"
            alt="Martins Investments"
            className="h-auto w-44 object-contain brightness-110 contrast-105 drop-shadow-sm sm:w-52"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <div className="group relative py-7">
            <Link
              to="/about"
              activeProps={{ className: "text-gold" }}
              inactiveProps={{
                className: useSolidHeader ? "text-muted-foreground" : "text-white/82",
              }}
              className="flex items-center gap-1.5 text-[0.8rem] tracking-[0.14em] uppercase transition-colors hover:text-gold"
            >
              The Group
              <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-2 border border-border bg-onyx/98 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {groupNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: "text-gold bg-gold/5" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="block border-b border-border/70 px-4 py-3 text-[0.72rem] tracking-[0.15em] uppercase transition-colors last:border-0 hover:bg-gold/5 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {nav
            .filter((item) => item.to !== "/")
            .map((item) => (
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
            <div className="border-b border-border py-4">
              <p className="text-sm tracking-[0.16em] uppercase text-gold">The Group</p>
              <div className="mt-3 border-l border-gold/30 pl-4">
                {groupNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-xs tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
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
