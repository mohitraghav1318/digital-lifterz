import { useEffect } from "react";

const SELECTOR = ".rv:not(.is-in), .tr:not(.is-in), .lit:not(.is-in)";

/**
 * Adds `is-in` to `.rv`, `.tr` and `.lit` elements inside `ref` once they
 * scroll into view. Re-scans whenever a value in `deps` changes.
 */
export default function useReveal(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll(SELECTOR);

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));

    // Fast scrolls or anchor jumps can skip elements entirely; reveal anything
    // that is already above the viewport.
    let frame = 0;
    const catchUp = () => {
      frame = 0;
      root.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(catchUp);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
