import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollToTop - Manages scroll position on route changes.
 * - For new navigation (PUSH), it resets to the top.
 * - For history navigation (POP), it allows the browser to restore position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on "PUSH" (new navigation) or "REPLACE"
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}
