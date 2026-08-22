import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { readConsent, saveConsent, type ConsentPreferences } from "@/lib/consent";
import { GA_MEASUREMENT_ID } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsent() {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [open, setOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [externalMedia, setExternalMedia] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setPreferences(saved);
    setAnalytics(saved?.analytics ?? false);
    setExternalMedia(saved?.externalMedia ?? false);
    setOpen(!saved);

    const showSettings = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setExternalMedia(current?.externalMedia ?? false);
      setCustomising(true);
      setOpen(true);
    };
    window.addEventListener("martins-open-cookie-settings", showSettings);
    return () => window.removeEventListener("martins-open-cookie-settings", showSettings);
  }, []);

  useEffect(() => {
    if (!preferences?.analytics || !GA_MEASUREMENT_ID) return;
    if (document.querySelector(`script[data-martins-analytics]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset["martinsAnalytics"] = "true";
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("consent", "default", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }, [preferences]);

  const commit = (next: { analytics: boolean; externalMedia: boolean }) => {
    if (!next.analytics) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0]?.trim();
        if (name?.startsWith("_ga")) {
          document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
        }
      });
    }
    saveConsent(next);
    setPreferences({ ...next, updatedAt: new Date().toISOString() });
    setOpen(false);
    setCustomising(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-gold/35 bg-background p-6 text-foreground shadow-2xl sm:p-8">
      {preferences ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close cookie settings"
          className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      ) : null}
      <p className="eyebrow">Your privacy choices</p>
      <h2 className="mt-3 text-2xl">Cookies and external services</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        We use necessary storage to remember your choices. With your permission, we also use
        analytics to understand site usage and external media to display services such as maps.
      </p>

      {customising ? (
        <div className="mt-6 space-y-3">
          <ConsentRow
            label="Necessary"
            description="Required for preferences and core site operation."
            checked
            disabled
          />
          <ConsentRow
            label="Analytics"
            description="Helps us understand visits and improve the website."
            checked={analytics}
            onChange={setAnalytics}
          />
          <ConsentRow
            label="External media"
            description="Allows third-party content such as Google Maps."
            checked={externalMedia}
            onChange={setExternalMedia}
          />
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap gap-3">
        {customising ? (
          <button
            type="button"
            onClick={() => commit({ analytics, externalMedia })}
            className="bg-gold px-5 py-3 text-xs tracking-[.16em] uppercase text-gold-foreground"
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            onClick={() => commit({ analytics: true, externalMedia: true })}
            className="bg-gold px-5 py-3 text-xs tracking-[.16em] uppercase text-gold-foreground"
          >
            Accept all
          </button>
        )}
        <button
          type="button"
          onClick={() => commit({ analytics: false, externalMedia: false })}
          className="border border-border px-5 py-3 text-xs tracking-[.16em] uppercase"
        >
          Reject optional
        </button>
        {!customising ? (
          <button
            type="button"
            onClick={() => setCustomising(true)}
            className="border border-border px-5 py-3 text-xs tracking-[.16em] uppercase"
          >
            Manage choices
          </button>
        ) : null}
        <Link
          to="/cookies"
          className="self-center text-xs text-gold underline-offset-4 hover:underline"
        >
          Cookie policy
        </Link>
      </div>
    </div>
  );
}

function ConsentRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-6 border border-border p-4">
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="size-5 accent-[var(--gold)]"
      />
    </label>
  );
}
