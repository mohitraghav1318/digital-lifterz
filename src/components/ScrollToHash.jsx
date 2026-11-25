import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to #hash targets after navigation, or to the top on a new page.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return undefined;
    }

    const id = hash.slice(1);
    // Wait for the page transition to mount the new route.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
