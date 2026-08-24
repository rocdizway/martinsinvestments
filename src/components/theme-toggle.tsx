import { Facebook, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "martins-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(storageKey, next);
    applyTheme(next);
  };

  const controlClassName =
    "relative grid size-14 place-items-center border border-gold/45 bg-background/88 text-gold shadow-[0_20px_60px_-28px_oklch(0_0_0_/_75%)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className="fixed right-5 bottom-5 z-[60] flex flex-col gap-3 md:right-8 md:bottom-8">
      <a
        href="https://web.facebook.com/martinsinvestments"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Martins Investments on Facebook"
        title="Follow us on Facebook"
        className={controlClassName}
      >
        <span className="absolute inset-1 border border-gold/15" aria-hidden="true" />
        <Facebook className="size-5" fill="currentColor" aria-hidden="true" />
      </a>
      <button
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
        className={controlClassName}
      >
        <span className="absolute inset-1 border border-gold/15" aria-hidden="true" />
        <Sun
          className={`size-5 transition-all duration-500 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`absolute size-5 transition-all duration-500 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
