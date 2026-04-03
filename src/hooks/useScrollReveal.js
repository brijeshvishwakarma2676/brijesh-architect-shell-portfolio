import { useRef } from 'react';

/**
 * useScrollReveal - A deactivated version of the reveal hook.
 * The 'Jaan' system has been removed for a more direct UI experience.
 * 
 * @returns {React.RefObject} ref
 */
export function useScrollReveal() {
  const ref = useRef(null);
  return ref;
}
