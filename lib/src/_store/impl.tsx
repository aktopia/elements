import { QueryClient, QueryClientProvider, useQuery as useReactQuery } from 'react-query';
import { create } from 'zustand';
import { ReactNode, useCallback } from 'react';
import { Store as StoreInterface } from '@elements/_store/interface';

const subscriptions: any = {};
const events: any = {};

const useStore = create(() => ({
  bears: 0,
}));

type Read = (state: any, params?: Record<string, any>) => any;
type AsyncRead = (params?: Record<string, any>) => any;

function queryFn({ queryKey }: any) {
  const [id, params] = queryKey;
  const sub = subscriptions[id].fn;
  return sub(params);
}

const useRemote = (id: string, params?: Record<string, any>) => {
  const { data } = useReactQuery([id, params]);
  return data;
};

const useLocal = (id: string, params?: Record<string, any>) => {
  const read = subscriptions[id].fn;
  return useStore((state) => read(state, params));
};

function useValueImpl<T>(id: string, params?: Record<string, any>): T {
  const useVal = subscriptions[id].async ? useRemote : useLocal;
  return useVal(id, params) as T;
}

function useDispatchImpl(id: string, options?: any): any {
  const { emptyParams = false }: any = options || {};
  const { fn } = events[id];
  return useCallback(
    (params?: Record<string, any>) => fn(useStore.setState, emptyParams ? {} : params || {}),
    [fn, emptyParams]
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFn,
      suspense: true,
    },
  },
});

export function sub(id: string, fn: Read) {
  subscriptions[id] = { fn, async: false };
}

export function asyncSub(id: string, fn: AsyncRead) {
  subscriptions[id] = { fn, async: true };
}

export function event(id: string, fn: any) {
  events[id] = { fn };
}

export const Store = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreInterface useDispatch={useDispatchImpl} useValue={useValueImpl}>
        {children}
      </StoreInterface>
    </QueryClientProvider>
  );
};
