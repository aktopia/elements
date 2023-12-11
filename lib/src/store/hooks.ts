import { useDispatch, useValue } from '@elements/store/interface';
import { useCallback, useMemo, useState } from 'react';
import type { Ident } from '@elements/types';

export const useWrapRequireAuth = (callback: Function, deps: Array<any>) => {
  const sessionExists = useValue('auth.session/exists');
  const promptSignIn = useDispatch('auth.sign-in/initiate');

  return useCallback(
    (...args: any[]) => {
      if (!sessionExists) {
        return promptSignIn({});
      }
      return callback(...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionExists, promptSignIn, ...deps]
  );
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

export const useIdent = (attr: string, val: string) => {
  return useMemo(() => [attr, val], [attr, val]) as Ident;
};

export const useWrapWaiting = <T extends (...args: any[]) => Promise<void> | void>(
  callback: T,
  initialValue: boolean,
  deps: Array<any>
) => {
  const [waiting, setWaiting] = useState<boolean>(initialValue);

  const cb = useCallback(
    async (...args: any[]) => {
      setWaiting(true);
      await callback(...args);
      setWaiting(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );

  return [cb, waiting] as [T, typeof waiting];
};
