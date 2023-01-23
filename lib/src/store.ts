import { createContext, useContext, useSyncExternalStore } from 'react';

export type Subscribe = (onStoreChange: () => void) => () => void;

export type Read = (key: string, args: Array<any>) => any;

export type Dispatch = (key: string, args: Array<any>) => void;

export const StoreContext = createContext<any>({});

export function useValue(key: string, ...args: Array<any>) {
  const { read, subscribe } = useContext(StoreContext);
  return useSyncExternalStore(subscribe, () => read(key, args));
}

export function useDispatch(key: string) {
  const { dispatch } = useContext(StoreContext);
  return (...args: Array<any>) => dispatch(key, args);
}
