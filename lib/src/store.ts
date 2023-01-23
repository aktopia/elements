import { useSyncExternalStore } from 'react';

type Subscribe = (onStoreChange: () => void) => () => void;
type Read = (key: string, args: Array<any>) => any;
type Dispatch = (key: string, args: Array<any>) => void;

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

export function useStore(key: string, ...args: Array<any>) {
  const { read, subscribe } = store;
  return useSyncExternalStore(subscribe, () => read(key, args));
}
