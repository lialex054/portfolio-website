// FILE: src/hooks/use-scroll-lock.ts

"use client";

import { useEffect } from 'react';

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // When locked, add overflow-hidden to the body
      document.body.style.overflow = 'hidden';
    } else {
      // When unlocked, remove the style
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scroll is restored when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]); // Rerun this effect whenever the isLocked state changes
}