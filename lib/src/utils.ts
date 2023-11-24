import type { ManipulateType } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { RefObject } from 'react';
import { useCallback, useEffect } from 'react';
import { cx as clsx } from 'cva';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'cva/dist/types';
import type { LookupRef } from '@elements/types';
import { EntityType } from '@elements/types';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz');

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatCount(count: number) {
  return formatter.format(count);
}

export const useOutsideClick = (ref: RefObject<any>, callback: () => void) => {
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

// TODO spid
export function ref(lookupRef: LookupRef) {
  return JSON.stringify(lookupRef);
}

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keep<T>(a: T[], fn: (e: T) => any) {
  for (let i = 0; i < a.length; i++) {
    const result = fn(a[i]);
    if (result) {
      return result;
    }
  }
  return null;
}

export const emptyObject = {};

export const scrollToTop = ({ behavior = 'smooth' }: { behavior: ScrollBehavior }) => {
  window.scrollTo({ top: 0, behavior });
};

export const guid = () => {
  return nanoid();
};

export function makeLink(type: EntityType, entityId: string) {
  switch (type) {
    case EntityType.Action:
      return `/action/${entityId}`;
    case EntityType.Issue:
      return `/issue/${entityId}`;
    case EntityType.User:
      return `/profile/${entityId}#tab=actions`;
  }
}
