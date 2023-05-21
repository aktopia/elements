import React, { useCallback, useEffect } from 'react';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatCount(count: number) {
  return formatter.format(count);
}

export const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
