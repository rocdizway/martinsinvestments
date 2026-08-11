import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

const revealSelector = [
  "main section:not(:first-child) > .mx-auto > *",
  "main section:not(:first-child) article",
  "main section:not(:first-child) form",
  "main section:not(:first-child) aside",
].join(",");

export function ScrollReveal() {
  const location = useLocation();

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
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    let firstFrame = 0;
    let secondFrame = 0;
    let mutationFrame = 0;

    const prepareElements = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

      elements.forEach((element) => {
        if (element.dataset.reveal || element.closest("[data-no-reveal]")) return;

        const section = element.closest("section");
        const sectionElements = section
          ? Array.from(section.querySelectorAll<HTMLElement>(revealSelector))
          : elements;
        const position = Math.max(0, sectionElements.indexOf(element));

        element.dataset.reveal = "pending";
        element.style.setProperty("--reveal-delay", `${Math.min(position, 4) * 85}ms`);
      });

      // Waiting for a second animation frame guarantees that the browser paints
      // the pending state before IntersectionObserver reveals visible elements.
      secondFrame = window.requestAnimationFrame(() => {
        elements.forEach((element) => {
          if (element.dataset.reveal === "pending") observer.observe(element);
        });
      });
    };

    firstFrame = window.requestAnimationFrame(prepareElements);

    const mutationObserver = new MutationObserver(() => {
      window.cancelAnimationFrame(mutationFrame);
      mutationFrame = window.requestAnimationFrame(prepareElements);
    });
    mutationObserver.observe(document.querySelector("main") ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.cancelAnimationFrame(mutationFrame);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return null;
}
