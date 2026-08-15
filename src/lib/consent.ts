export type ConsentPreferences = {
  analytics: boolean;
  externalMedia: boolean;
  updatedAt: string;
};

export const CONSENT_KEY = "martins-cookie-consent-v1";
export const CONSENT_EVENT = "martins-consent-change";

export function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(
      window.localStorage.getItem(CONSENT_KEY) || "null",
    ) as ConsentPreferences | null;
  } catch {
    return null;
  }
}

export function saveConsent(preferences: Omit<ConsentPreferences, "updatedAt">) {
  const value = { ...preferences, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
