export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.martinsinvestments.com"
).replace(/\/$/, "");

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
