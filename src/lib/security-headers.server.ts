import { createCspNonce, CSP_NONCE_HEADER } from "./csp";

const ANALYTICS_CONNECT_SOURCES = [
  "https://*.analytics.google.com",
  "https://*.google-analytics.com",
  "https://stats.g.doubleclick.net",
];

const PREVIEW_HOST_SUFFIXES = [".lovable.app", ".lovableproject.com"];

function isLocalOrLovablePreview(request: Request): boolean {
  const hostname = new URL(request.url).hostname.toLowerCase();
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    PREVIEW_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
  );
}

function contentSecurityPolicy(request: Request, nonce: string): string {
  const isPreview = isLocalOrLovablePreview(request);
  const scriptSources = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "https://www.googletagmanager.com",
  ];
  const connectSources = ["'self'", ...ANALYTICS_CONNECT_SOURCES];

  // Vite's development client needs eval and a websocket. These sources are
  // deliberately limited to local/Lovable preview hosts and never reach the
  // production policy for the public site.
  if (isPreview) {
    scriptSources.push(
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://*.lovable.app",
      "https://*.lovableproject.com",
      "https://cdn.gpteng.co",
    );
    connectSources.push("ws:", "wss:", "https://*.lovable.app", "https://*.lovableproject.com");
  }

  const frameAncestors = isPreview
    ? "'self' https://*.lovable.app https://*.lovableproject.com"
    : "'none'";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    `frame-ancestors ${frameAncestors}`,
    "form-action 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' https:",
    "frame-src https://www.google.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
    `connect-src ${connectSources.join(" ")}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * Applies the browser security policy at the application boundary so it is
 * present on successful pages, redirects and locally rendered error pages.
 */
export function withSecurityHeaders(request: Request, response: Response): Response {
  const headers = new Headers(response.headers);
  const nonce = headers.get(CSP_NONCE_HEADER) || createCspNonce();

  headers.delete(CSP_NONCE_HEADER);
  headers.set("Content-Security-Policy", contentSecurityPolicy(request, nonce));
  headers.set(
    "Permissions-Policy",
    [
      "accelerometer=()",
      "autoplay=(self)",
      "camera=()",
      "display-capture=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "picture-in-picture=(self)",
      "publickey-credentials-get=(self)",
      "usb=()",
    ].join(", "),
  );
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");

  if (isLocalOrLovablePreview(request)) {
    // The Lovable editor intentionally embeds its own preview. CSP limits the
    // permitted parents there; X-Frame-Options cannot express that allowlist.
    headers.delete("X-Frame-Options");
  } else {
    headers.set("X-Frame-Options", "DENY");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
