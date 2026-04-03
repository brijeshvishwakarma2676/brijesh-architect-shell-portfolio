import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll - A wrapper component to initialize Lenis smooth scrolling globally.
 * Provides inertial scrolling for a more "premium" feel.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothHorizontal: false,
      mouseMultiplier: 1,
      smoothWheel: true,
    });

    // Request animation frame for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global listener for anchor links to ensure they go through Lenis
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.origin === window.location.origin) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
