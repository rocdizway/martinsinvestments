import { useEffect } from "react";

const revealSelector = [
  "main section:not(:first-child) > .mx-auto > *",
  "main section:not(:first-child) .surface-card",
  "main section:not(:first-child) .sister-card",
  "main section:not(:first-child) .service-structure-panel > div",
  "main section:not(:first-child) article",
  "main section:not(:first-child) form",
  "main section:not(:first-child) aside",
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.dataset.reveal = "visible";
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      },
    );

    let queued = false;

    const prepareElements = () => {
      queued = false;
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(revealSelector),
      );

      elements.forEach((element, index) => {
        if (element.dataset.reveal) return;
        if (element.closest("[data-no-reveal]")) return;

        element.dataset.reveal = "pending";
        element.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);
        observer.observe(element);
      });
    };

    const schedulePrepare = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(prepareElements);
    };

    schedulePrepare();

    const mutationObserver = new MutationObserver(schedulePrepare);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
