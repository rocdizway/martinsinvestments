export const MAX_INSIGHTS_PAGE = 10_000;

const DECIMAL_PAGE_PATTERN = /^[1-9]\d*$/u;

/**
 * Normalizes the public `page` query parameter. Page one is deliberately
 * omitted so links and canonical URLs resolve to `/insights`.
 */
export function normalizeInsightsPage(value: unknown): number | undefined {
  let parsed: number;

  if (typeof value === "number") {
    parsed = value;
  } else if (typeof value === "string" && DECIMAL_PAGE_PATTERN.test(value)) {
    parsed = Number(value);
  } else {
    return undefined;
  }

  if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > MAX_INSIGHTS_PAGE) {
    return undefined;
  }

  return parsed === 1 ? undefined : parsed;
}

export function isInsightsPageOutOfRange(page: number, totalPages: number): boolean {
  return page > 1 && page > totalPages;
}

export function getInsightsCanonicalPath(page: unknown): string {
  const normalizedPage = normalizeInsightsPage(page);
  return normalizedPage === undefined ? "/insights" : `/insights?page=${normalizedPage}`;
}
