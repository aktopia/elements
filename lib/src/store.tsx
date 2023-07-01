import {
  createContext,
  memo,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

export type Subscribe = (
  id: string,
  params: Record<string, any>,
  onStoreChange: () => void
) => () => void;

export type Read = (id: string, params?: Record<string, any>) => any;

export type Dispatch = (id: string, params?: Record<string, any>) => void;

export type CheckPending = (value: any) => boolean;

export type Equal = (x: any, y: any) => boolean;

export type Marshal = (x: any) => any;

type StoreContextType = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  checkPending: CheckPending;
  equal?: Equal;
  marshal?: Marshal;
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
  const { read, subscribe } = useContext(StoreContext);
  const paramsStringified = JSON.stringify(params);

  const _subscribe = useCallback(
    (onStoreChange: () => void) => subscribe(id, params || {}, onStoreChange),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paramsStringified, id, subscribe]
  );

  const _read = useCallback(
    () => read(id, params || {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paramsStringified, id, read]
  );

  return useSyncExternalStore(_subscribe, _read);
}

interface DispatchOptions {
  emptyParams?: boolean;
}

export function useDispatch(id: string, options?: any): DispatchReturn {
  const { emptyParams = false }: DispatchOptions = options || {};
  const { dispatch } = useContext(StoreContext);
  return useCallback(
    (params?: Record<string, any>) => dispatch(id, emptyParams ? {} : params || {}),
    [dispatch, id, emptyParams]
  );
}

export function useState(id: string): [any, (value: any) => void] {
  const value = useValue('generic/state', { id });
  const dispatch = useDispatch('generic.state/set');
  const setValue = useCallback((value: any) => dispatch({ id, value }), [dispatch, id]);
  return [value, setValue];
}

export type StoreProps = {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  children: ReactNode;
  checkPending: CheckPending;
  equal?: Equal;
  marshal?: Marshal;
};

export const Store = memo(
  ({ read, dispatch, subscribe, checkPending, children, equal, marshal }: StoreProps) => {
    const ctx = useMemo(
      () => ({
        read,
        dispatch,
        subscribe,
        checkPending,
        equal,
        marshal,
      }),
      [read, dispatch, subscribe, checkPending, equal, marshal]
    );

    return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
  }
);
