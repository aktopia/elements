import { QueryClient, QueryClientProvider, useQuery as useReactQuery } from 'react-query';
import { create } from 'zustand';
import { ReactNode, useCallback } from 'react';
import { Store as StoreInterface } from '@elements/store/interface';
import { Dispatch, events, subscriptions } from '@elements/store/register';
import { slices } from '@elements/store/slices';

const useStore = create(() => {
  return slices.reduce((acc, slice) => {
    return { ...acc, ...slice() };
  }, {});
});

function queryFn({ queryKey }: any) {
  const [id, params] = queryKey;
  const sub = subscriptions[id].fn;
  return sub(params);
}

export const setState = useStore.setState;

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

function useDispatchImpl(id: string, options?: any): Dispatch {
  const { emptyParams = false }: any = options || {};
  const { fn } = events[id];
  return useCallback(
    (params?: Record<string, any>) => fn(setState, emptyParams ? {} : params || {}),
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

export const Store = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreInterface useDispatch={useDispatchImpl} useValue={useValueImpl}>
        {children}
      </StoreInterface>
    </QueryClientProvider>
  );
};
