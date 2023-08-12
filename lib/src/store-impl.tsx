import { useQuery as useReactQuery } from 'react-query';
import { create } from 'zustand';
import { useCallback } from 'react';

const subscriptions: any = {};
const events: any = {};

const useStore = create(() => ({
  bears: 0,
}));

export function sub(id: any, fn: any) {
  subscriptions[id] = { fn, async: false };
}

export function asyncSub(id: any, fn: any) {
  subscriptions[id] = { fn, async: true };
}

asyncSub('action/id', (params: any) => {
  return new Promise((res) => res(params['id']));
});

sub('bears', (state: any, { n }: any) => {
  return state.bears + n;
});

export function queryFunction({ queryKey }: any) {
  const [id, params] = queryKey;
  const sub = subscriptions[id].fn;
  return sub(params);
}

const useRemote = (id: string, params?: Record<string, any>) => {
  const { data } = useReactQuery([id, params]);
  return data;
};

const useLocal = (id: string, params?: Record<string, any>) => {
  const sub = subscriptions[id].fn;
  return useStore((state: any) => sub(state, params));
};

export function useValue<T>(id: string, params?: Record<string, any>): T {
  const useVal = subscriptions[id].async ? useRemote : useLocal;
  return useVal(id, params) as T;
}

export function event(id: string, fn: any) {
  events[id] = { fn };
}

export function useDispatch(id: string, options?: any): any {
  const { emptyParams = false }: any = options || {};
  const { fn } = events[id];
  return useCallback(
    (params?: Record<string, any>) => fn(useStore.setState, emptyParams ? {} : params || {}),
    [fn, emptyParams]
  );
}

event('inc', (setState: any, { n }: any) => {
  console.log(n);
  setState((state: any) => ({ bears: state.bears + n }));
});
