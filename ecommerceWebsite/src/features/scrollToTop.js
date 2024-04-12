import { useRef, useEffect } from 'react';

export function useScrollToTop() {
  const ref = useRef(null);

  useEffect(() => {
    const handleRouteChange = () => {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleRouteChange); // Listen for back/forward button clicks

    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []); // Empty dependency array to run only once

  return ref;
}