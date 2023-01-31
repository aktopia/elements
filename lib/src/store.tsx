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

export type CheckPending = (value: any) => boolean;

type StoreContextType = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  checkPending: CheckPending;
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
  checkPending: (_value: any) => {
    throw new Error('"checkPending" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export function useValue<T>(id: string, params?: Record<string, any>): T {
  const { read, subscribe, checkPending } = useContext(StoreContext);
  const promiseResolveRef = useRef<Function>();
  const _subscribe = useCallback<Subscribe>(
    (onStoreChange) => {
      const promiseResolve = promiseResolveRef.current;
      if (promiseResolve) {
        const value = read(id, params);
        checkPending(value) && promiseResolve(value);
      }

      return subscribe(onStoreChange);
    },
    [read, subscribe, id, params, checkPending]
  );

  const value = useSyncExternalStore(_subscribe, () => read(id, params));

  if (checkPending(value)) {
    throw new Promise((resolve) => {
      promiseResolveRef.current = resolve;
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
  checkPending: CheckPending;
};

export const Store = ({ read, dispatch, subscribe, checkPending, children }: StoreProps) => {
  const ctx = useMemo(
    () => ({
      read,
      dispatch,
      subscribe,
      checkPending,
    }),
    [read, dispatch, subscribe, checkPending]
  );

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
};
