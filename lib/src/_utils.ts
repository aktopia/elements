import dayjs, { ManipulateType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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

export function tsToStr(ts: number, format: string, _tz?: string) {
  const date = dayjs(ts);
  return date.format(format);
}

export function subtract(ts: number, amount: number, unit: ManipulateType) {
  const date = dayjs(ts);
  return date.subtract(amount, unit).valueOf();
}

dayjs.extend(relativeTime);

export function timeAgoStr(ts: number) {
  const date = dayjs(ts);
  return date.fromNow();
}

export function tsNow() {
  return dayjs().valueOf();
}

export function isAfter(ts1: number, ts2: number, unit: ManipulateType) {
  const date = dayjs(ts1);
  return date.isAfter(ts2, unit);
}

export function isBefore(ts1: number, ts2: number, unit: ManipulateType) {
  const date = dayjs(ts1);
  return date.isBefore(ts2, unit);
}
