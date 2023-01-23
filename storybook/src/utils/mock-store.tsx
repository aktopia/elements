import { Dispatch, Read, StoreContext, Subscribe } from '@elements/store';
import { ReactNode, useCallback } from 'react';

const subscribe: Subscribe = (_) => () => null;

interface MockStoreProps {
  read?: { [key: string]: any };
  dispatch?: { [key: string]: any };
  children: ReactNode;
}

export const MockStore = ({ read, dispatch, children }: MockStoreProps) => {
  const _read = useCallback<Read>((key, _) => read && read[key], [read]);
  const _dispatch = useCallback<Dispatch>(
    (key, args) => dispatch && dispatch[key](...args),
    [dispatch]
  );

  return (
    <StoreContext.Provider value={{ read: _read, dispatch: _dispatch, subscribe }}>
      {children}
    </StoreContext.Provider>
  );
};
