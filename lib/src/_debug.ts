import { useEffect, useRef } from 'react';

export const useHasChanged = (x: any) => {
  const prevVal = useRef(x);
  const hasChanged = prevVal.current !== x;

  useEffect(() => {
    prevVal.current = x;
  }, [x]);

  console.log(x, hasChanged ? ' has changed' : ' has not changed');

  return hasChanged;
};
