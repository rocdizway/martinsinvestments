export const CSP_NONCE_HEADER = "x-martins-csp-nonce";

export function createCspNonce(): string {
  return crypto.randomUUID().replaceAll("-", "");
}
