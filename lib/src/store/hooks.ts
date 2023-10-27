import { useDispatch, useValue } from '@elements/store';
import { useCallback, useMemo } from 'react';
import type { LookupRef } from '@elements/types';

export const useWrapRequireAuth = (callback: Function, deps: Array<any>) => {
  const sessionExists = useValue('auth.session/exists');
  const promptSignIn = useDispatch('auth.sign-in/initiate');

  return useCallback(() => {
    if (!sessionExists) {
      return promptSignIn({});
    }
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionExists, promptSignIn, ...deps]);
};

export const useCurrentUserId = () => {
  return useValue('current.user/id');
};

export const useViewport = () => {
  return useValue('viewport/size');
};

export const useIsCompactViewport = () => {
  const viewport = useValue('viewport/size');
  return viewport === 'md' || viewport === 'sm';
};

export const useLookupRef = (attr: string, val: string) => {
  return useMemo(() => [attr, val], [attr, val]) as LookupRef;
};
