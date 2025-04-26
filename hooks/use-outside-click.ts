'use client';

import { RefObject, useEffect } from 'react';

type OutsideClickCallback = (event: MouseEvent | TouchEvent) => void;

/**
 * Custom hook to detect clicks outside a specified element.
 * @param ref - React ref object for the element to monitor
 * @param callback - Function to call when a click occurs outside the referenced element
 */
export function useOutsideClick<T extends HTMLElement | null>(ref: RefObject<T>, callback: OutsideClickCallback) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [ref, callback]);
}
