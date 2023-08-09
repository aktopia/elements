import { useQuery } from 'react-query';

const subscriptions: any = {};

export function regSub(id: any, fn: any) {
  subscriptions[id] = fn;
}

regSub('action/id', (params: any) => {
  return params['id'];
});

export function queryFunction({ queryKey }: any) {
  const [id, params] = queryKey;
  const sub = subscriptions[id];
  return Promise.resolve(sub(params));
}

export function useValue<T>(id: string, params?: Record<string, any>): T {
  const { data } = useQuery([id, params]);
  return data as T;
}
