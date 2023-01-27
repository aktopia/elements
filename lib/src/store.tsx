import { createContext, type ReactNode, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

export type Subscribe = (onStoreChange: () => void) => () => void;

export type Read = (id: string, params?: Record<string, any>) => any;

export type Dispatch = (id: string, params?: Record<string, any>) => void;

type StoreContextType = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
}

const placeholderContext: StoreContextType = {
  read: (_id, _params) => {
    throw new Error('"read" not set for StoreContext');
  },
  subscribe: (_callback) => {
    throw new Error('"subscribe" not set for StoreContext');
  },
  dispatch: (_id, _params) => {
    throw new Error('"dispatch" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export function useValue(id: string, params?: Record<string, any>) {
  const { read, subscribe } = useContext(StoreContext);
  return useSyncExternalStore(subscribe, () => read(id, params));
}

export function useDispatch(id: string): ((params?: Record<string, any>) => void) {
  const { dispatch } = useContext(StoreContext);
  return useCallback((params?: Record<string, any>) => dispatch(id, params), [dispatch, id]);
}

type StoreProps = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  children: ReactNode;
};

export function Store({ read, dispatch, subscribe, children }: StoreProps) {
  const ctx = useMemo(() => ({
      read, dispatch, subscribe,
    }), [read, dispatch, subscribe],
  );

  return (
    <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>
  );
}
