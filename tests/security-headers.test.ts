import { describe, expect, it } from "vitest";

import { createCspNonce, CSP_NONCE_HEADER } from "../src/lib/csp";
import { withSecurityHeaders } from "../src/lib/security-headers.server";

const TEST_NONCE = "0123456789abcdef0123456789abcdef";

describe("withSecurityHeaders", () => {
  it("enforces the production browser policy and preserves the response", async () => {
    const response = withSecurityHeaders(
      new Request("https://www.martinsinvestments.com/portfolio"),
      new Response("portfolio", {
        status: 201,
        headers: {
          "cache-control": "public, max-age=60",
          [CSP_NONCE_HEADER]: TEST_NONCE,
        },
      }),
    );

    expect(response.status).toBe(201);
    expect(await response.text()).toBe("portfolio");
    expect(response.headers.get("cache-control")).toBe("public, max-age=60");
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("permissions-policy")).toContain("camera=()");

    const csp = response.headers.get("content-security-policy");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain(`'nonce-${TEST_NONCE}'`);
    expect(csp).toContain("'strict-dynamic'");
    expect(csp).toContain("https://www.youtube-nocookie.com");
    expect(csp).toContain("https://player.vimeo.com");
    expect(csp).toContain("media-src 'self' https:");
    expect(csp).toContain("upgrade-insecure-requests");
    const scriptSrc = csp?.split("; ").find((directive) => directive.startsWith("script-src "));
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
    expect(response.headers.has(CSP_NONCE_HEADER)).toBe(false);
  });

  it("permits the editor frame and Vite websocket only on preview hosts", () => {
    const response = withSecurityHeaders(
      new Request("https://project-preview.lovable.app/"),
      new Response("preview", { headers: { [CSP_NONCE_HEADER]: TEST_NONCE } }),
    );
    const csp = response.headers.get("content-security-policy");

    expect(response.headers.get("x-frame-options")).toBeNull();
    expect(csp).toContain(
      "frame-ancestors 'self' https://*.lovable.app https://*.lovableproject.com",
    );
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain("ws: wss:");
  });

  it("generates a fresh CSP nonce", () => {
    const firstNonce = createCspNonce();
    const secondNonce = createCspNonce();

    expect(firstNonce).toMatch(/^[a-f0-9]{32}$/u);
    expect(secondNonce).not.toBe(firstNonce);
  });
});
