import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';

// Global cache for scroll positions per route key
const scrollCache = new Map();
let projectAnchorSlug = null;

/**
 * SmoothScroll - A hardened scroll provider that prevents "scroll leakage" 
 * between pages and ensures rock-solid history restoration.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();
  const navType = useNavigationType();
  const isTransitioningRef = useRef(false);
  const currentKeyRef = useRef(location.key);

  // Sync the current key to a ref for the stable listener
  useEffect(() => {
    currentKeyRef.current = location.key;
    if (location.pathname.startsWith('/projects/')) {
      projectAnchorSlug = location.pathname.split('/').pop();
    }
  }, [location.key, location.pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Restore native touch momentum on mobile
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Stable Listener: Uses refs to avoid re-binding
    lenis.on('scroll', ({ scroll }) => {
      if (!isTransitioningRef.current && currentKeyRef.current) {
        scrollCache.set(currentKeyRef.current, scroll);
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global listener for internal anchor links 
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target?.hash && target.origin === window.location.origin) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      lenisRef.current = null;
    };
  }, []); // Initialize engine exactly once

  // 4. Restoration Logic
  useEffect(() => {
    if (!lenisRef.current) return;

    if (navType === 'PUSH') {
      isTransitioningRef.current = true;
      lenisRef.current.scrollTo(0, { immediate: true });
      const timer = setTimeout(() => { isTransitioningRef.current = false; }, 300);
      return () => clearTimeout(timer);
    }
    
    if (navType === 'POP') {
      isTransitioningRef.current = true;
      
      // Short delay to allow the new route to mount and layout to stabilize
      const timer = setTimeout(() => {
        const projectEl = projectAnchorSlug ? document.getElementById(`project-${projectAnchorSlug}`) : null;
        const savedPos = scrollCache.get(location.key) || 0;

        if (projectEl && location.pathname === '/') {
          // Smooth glide back to the project card instead of a hard snap
          lenisRef.current?.scrollTo(projectEl, { 
            duration: 0.5,
            offset: -120,
            force: true,
            onComplete: () => {
              isTransitioningRef.current = false;
              projectAnchorSlug = null;
            }
          });
        } else {
          // Standard restoration for other pages
          lenisRef.current?.scrollTo(savedPos, { 
            duration: 0.4,
            force: true,
            onComplete: () => {
              isTransitioningRef.current = false;
            }
          });
        }
      }, 50); // Faster trigger

      return () => {
        clearTimeout(timer);
        isTransitioningRef.current = false;
      };
    }
  }, [location.pathname, location.key, navType]);

  return <>{children}</>;
}
