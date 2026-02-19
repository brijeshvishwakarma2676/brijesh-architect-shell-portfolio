import { useEffect, useRef } from 'react';

/**
 * useScrollReveal - A lightweight scroll-triggered animation hook.
 * Uses IntersectionObserver to add a 'revealed' class when elements enter the viewport.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin, default '0px 0px -60px 0px'
 * @returns {React.RefObject} ref to attach to the container element
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe the container itself and all children with [data-reveal]
    const revealElements = element.querySelectorAll('[data-reveal]');
    revealElements.forEach((el) => observer.observe(el));

    // Also observe the container if it has data-reveal
    if (element.hasAttribute('data-reveal')) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
