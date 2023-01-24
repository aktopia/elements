import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useDeferredValue,
  useSyncExternalStore,
} from 'react';

export type Subscribe = (onStoreChange: () => void) => () => void;

export type Read = (id: string, params?: { [key: string]: any }) => any;

export type Dispatch = (id: string, params?: { [key: string]: any }) => void;

export const StoreContext = createContext<any>({});

export function useValue(id: string, params?: { [key: string]: any }) {
  const { read, subscribe } = useContext(StoreContext);
  const syncValue = useSyncExternalStore(subscribe, () => read(id, params));
  return useDeferredValue(syncValue);
}

export function useDispatch(id: string) {
  const { dispatch } = useContext(StoreContext);
  return useCallback((params?: { [key: string]: any }) => dispatch(id, params), [id]);
}

interface StoreProps {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
  children: ReactNode;
}

export const Store = ({ read, dispatch, subscribe, children }: StoreProps) => {
  return (
    <StoreContext.Provider value={{ read, dispatch, subscribe }}>{children}</StoreContext.Provider>
  );
};
