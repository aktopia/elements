import { useDispatch, useValue } from '@elements/store';
import { useCallback } from 'react';

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
