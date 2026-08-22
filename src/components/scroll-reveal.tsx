import { useLocation } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

const revealSelector = [
  "[data-scroll-reveal]",
  "main section:not(:first-child) > .mx-auto > *",
  "main section:not(:first-child).mx-auto > *",
  "main article.mx-auto > *",
].join(",");

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
};

function RevealController() {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animated = new WeakSet<Element>();
    const prepared = new Set<HTMLElement>();
    const running = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animated.has(entry.target)) return;

          const element = entry.target as HTMLElement;
          const delay = Number(element.dataset["revealDelay"] ?? 0);
          animated.add(element);
          observer.unobserve(element);
          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 680,
              delay,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          );
          running.add(animation);
          animation.addEventListener("finish", () => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.removeProperty("will-change");
            animation.cancel();
            running.delete(animation);
          });
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (prepared.has(element) || element.closest("[data-no-reveal]")) return;

        prepared.add(element);
        element.style.opacity = "0";
        element.style.transform = "translateY(24px)";
        element.style.willChange = "opacity, transform";

        if (element.getBoundingClientRect().bottom <= 0) {
          element.style.opacity = "1";
          element.style.transform = "none";
          element.style.removeProperty("will-change");
          animated.add(element);
          return;
        }

        observer.observe(element);
      });
    };

    prepare();
    const mutationObserver = new MutationObserver(prepare);
    mutationObserver.observe(document.querySelector("main") ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      running.forEach((animation) => animation.cancel());
      prepared.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
        element.style.removeProperty("will-change");
      });
    };
  }, [location.pathname]);

  return null;
}

export function ScrollReveal({ children, className, delay = 0 }: RevealProps) {
  if (children !== undefined) {
    return (
      <div className={className} data-scroll-reveal data-reveal-delay={delay}>
        {children}
      </div>
    );
  }

  return <RevealController />;
}
