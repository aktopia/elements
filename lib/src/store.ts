import { createContext, useContext, useSyncExternalStore } from 'react';

export type Subscribe = (onStoreChange: () => void) => () => void;
export type Read = (key: string, args: Array<any>) => any;
export type Dispatch = (key: string, args: Array<any>) => void;

interface Store {
  subscribe: Subscribe;
  read: Read;
  dispatch: Dispatch;
}

class Store {
  constructor(subscribe: Subscribe, read: Read, dispatch: Dispatch) {
    this.subscribe = subscribe;
    this.read = read;
    this.dispatch = dispatch;
  }
}

let store: Store;

export function init(subscribe: Subscribe, read: Read, dispatch: Dispatch) {
  store = new Store(subscribe, read, dispatch);
  Object.freeze(store);
}

export function dispatch(key: string, ...args: Array<any>) {
  store.dispatch(key, args);
}

export const StoreContext = createContext<any>({});

export function useValue(key: string, ...args: Array<any>) {
  const { read, subscribe } = useContext(StoreContext);
  return useSyncExternalStore(subscribe, () => read(key, args));
}

export function useDispatch(key: string) {
  const { dispatch } = useContext(StoreContext);
  return (...args: Array<any>) => dispatch(key, args);
}
