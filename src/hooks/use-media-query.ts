// FILE: src/hooks/use-media-query.ts

"use client";

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Update state if the media query match status changes
    const listener = () => setMatches(media.matches);
    
    // Set the initial state
    listener();
    
    media.addEventListener('change', listener);

    // Cleanup listener on component unmount
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}