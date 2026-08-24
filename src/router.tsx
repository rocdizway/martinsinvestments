import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { routeTree } from "./routeTree.gen";
import { createCspNonce, CSP_NONCE_HEADER } from "./lib/csp";

const getCspNonce = createIsomorphicFn()
  .server(() => {
    const nonce = createCspNonce();
    setResponseHeader(CSP_NONCE_HEADER, nonce);
    return nonce;
  })
  .client(
    () =>
      document.querySelector<HTMLMetaElement>('meta[property="csp-nonce"]')?.content || undefined,
  );

export const getRouter = () => {
  const queryClient = new QueryClient();
  const nonce = getCspNonce();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(nonce ? { ssr: { nonce } } : {}),
  });

  return router;
};
