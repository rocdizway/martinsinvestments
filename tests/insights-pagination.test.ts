import { describe, expect, it } from "vitest";

import {
  getInsightsCanonicalPath,
  isInsightsPageOutOfRange,
  MAX_INSIGHTS_PAGE,
  normalizeInsightsPage,
} from "@/lib/insights-pagination";

describe("normalizeInsightsPage", () => {
  it.each([undefined, null, "", " ", "0", "-1", "1.5", "2e1", "0x10", [], {}])(
    "normalizes malformed value %p to the first page",
    (value) => {
      expect(normalizeInsightsPage(value)).toBeUndefined();
    },
  );

  it("omits page one from normalized search", () => {
    expect(normalizeInsightsPage(1)).toBeUndefined();
    expect(normalizeInsightsPage("1")).toBeUndefined();
  });

  it("accepts bounded positive integer pages", () => {
    expect(normalizeInsightsPage(2)).toBe(2);
    expect(normalizeInsightsPage("42")).toBe(42);
    expect(normalizeInsightsPage(MAX_INSIGHTS_PAGE)).toBe(MAX_INSIGHTS_PAGE);
    expect(normalizeInsightsPage(MAX_INSIGHTS_PAGE + 1)).toBeUndefined();
  });
});

describe("Insights pagination metadata", () => {
  it("identifies only pages beyond the available range", () => {
    expect(isInsightsPageOutOfRange(1, 0)).toBe(false);
    expect(isInsightsPageOutOfRange(2, 1)).toBe(true);
    expect(isInsightsPageOutOfRange(2, 2)).toBe(false);
  });

  it("keeps valid pagination in the canonical path", () => {
    expect(getInsightsCanonicalPath(1)).toBe("/insights");
    expect(getInsightsCanonicalPath(2)).toBe("/insights?page=2");
  });
});
