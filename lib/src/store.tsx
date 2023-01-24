import { createContext, ReactNode, useCallback, useContext, useSyncExternalStore } from 'react';

export type Subscribe = (onStoreChange: () => void) => () => void;

export type Read = (id: string, args: Array<any>) => any;

export type Dispatch = (id: string, args: Array<any>) => void;

export const StoreContext = createContext<any>({});

export function useValue(id: string, ...args: Array<any>) {
  const { read, subscribe } = useContext(StoreContext);
  return useSyncExternalStore(subscribe, () => read(id, args));
}

export function useDispatch(id: string) {
  const { dispatch } = useContext(StoreContext);
  return useCallback((...args: Array<any>) => dispatch(id, args), [id]);
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
