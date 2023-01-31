import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react';

export type Subscribe = (onStoreChange: () => void) => () => void;

export type Read = (id: string, params?: Record<string, any>) => any;

export type Dispatch = (id: string, params?: Record<string, any>) => void;

type StoreContextType = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  pendingSentinel: any;
};

type DispatchReturn = (params?: Record<string, any>) => void;

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
  pendingSentinel: 'sentinel/pending',
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export function useValue<T>(id: string, params?: Record<string, any>): T {
  const { read, subscribe, pendingSentinel } = useContext(StoreContext);
  const resolveRef = useRef<Function>();
  const _subscribe = useCallback<Subscribe>(
    (onStoreChange) => {
      if (read(id, params) === pendingSentinel && resolveRef.current) {
        resolveRef.current(read(id, params));
      }

      return subscribe(onStoreChange);
    },
    [read, subscribe, id, params, pendingSentinel]
  );

  const value = useSyncExternalStore(_subscribe, () => read(id, params));

  if (value === pendingSentinel) {
    throw new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }

  return value;
}

export function useDispatch(id: string): DispatchReturn {
  const { dispatch } = useContext(StoreContext);
  return useCallback((params?: Record<string, any>) => dispatch(id, params || {}), [dispatch, id]);
}

type StoreProps = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  children: ReactNode;
  pendingSentinel: any;
};

export const Store = ({ read, dispatch, subscribe, pendingSentinel, children }: StoreProps) => {
  const ctx = useMemo(
    () => ({
      read,
      dispatch,
      subscribe,
      pendingSentinel,
    }),
    [read, dispatch, subscribe, pendingSentinel]
  );

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
};
