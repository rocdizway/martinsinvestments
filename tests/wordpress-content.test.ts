import { describe, expect, it } from "vitest";

import {
  normalizeWordPressEmbedUrl,
  normalizeWordPressMediaUrl,
  sanitizeWordPressContent,
} from "@/lib/wordpress.server";

describe("WordPress media URL normalization", () => {
  it("accepts HTTPS and rejects insecure or credentialed media URLs", () => {
    expect(normalizeWordPressMediaUrl("https://media.example.com/photo.jpg")).toBe(
      "https://media.example.com/photo.jpg",
    );
    expect(normalizeWordPressMediaUrl("http://media.example.com/photo.jpg")).toBeNull();
    expect(normalizeWordPressMediaUrl("https://user:pass@media.example.com/photo.jpg")).toBeNull();
  });

  it("resolves relative media only against a secure base", () => {
    expect(normalizeWordPressMediaUrl("/uploads/photo.jpg", "https://cms.example.com/")).toBe(
      "https://cms.example.com/uploads/photo.jpg",
    );
    expect(normalizeWordPressMediaUrl("/uploads/photo.jpg", "http://cms.example.com/")).toBeNull();
  });
});

describe("WordPress embed sanitization", () => {
  it("allows only HTTPS YouTube and Vimeo player URLs", () => {
    expect(normalizeWordPressEmbedUrl("https://www.youtube-nocookie.com/embed/abc_123")).toBe(
      "https://www.youtube-nocookie.com/embed/abc_123",
    );
    expect(normalizeWordPressEmbedUrl("https://player.vimeo.com/video/12345")).toBe(
      "https://player.vimeo.com/video/12345",
    );
    expect(normalizeWordPressEmbedUrl("https://www.youtube.com/watch?v=abc_123")).toBeNull();
    expect(normalizeWordPressEmbedUrl("https://youtube.example.com/embed/abc_123")).toBeNull();
  });

  it("keeps safe media while removing HTTP images and untrusted frames", () => {
    const sanitized = sanitizeWordPressContent(
      [
        '<img src="http://cms.example.com/unsafe.jpg">',
        '<img src="/uploads/safe.jpg" alt="Safe">',
        '<iframe src="https://www.youtube-nocookie.com/embed/abc_123"></iframe>',
        '<iframe src="https://evil.example.com/embed/abc_123"></iframe>',
        '<video src="/uploads/clip.mp4" autoplay></video>',
      ].join(""),
      undefined,
      "https://cms.example.com/",
    );

    expect(sanitized).not.toContain("http://cms.example.com/unsafe.jpg");
    expect(sanitized).toContain('src="https://cms.example.com/uploads/safe.jpg"');
    expect(sanitized).toContain('loading="lazy"');
    expect(sanitized).toContain('decoding="async"');
    expect(sanitized).toContain('src="https://www.youtube-nocookie.com/embed/abc_123"');
    expect(sanitized).not.toContain("evil.example.com");
    expect(sanitized).toContain('src="https://cms.example.com/uploads/clip.mp4"');
    expect(sanitized).toContain("controls");
    expect(sanitized).toContain('preload="metadata"');
    expect(sanitized).not.toContain("autoplay");
  });
});
