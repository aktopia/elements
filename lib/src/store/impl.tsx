import { QueryClient, QueryClientProvider, useQuery as useReactQuery } from 'react-query';
import { create } from 'zustand';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { Store as StoreInterface, useDispatch, useValue } from '@elements/store/interface';
import { events, subscriptions } from '@elements/store/register';
import { slices } from '@elements/store/slices';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { Subs } from '@elements/store/types';

const useStore = create(
  immer(
    devtools(() => {
      return slices.reduce((acc, slice) => {
        return { ...acc, ...slice() };
      }, {});
    })
  )
);

function queryFn({ queryKey }: any) {
  const [id, params] = queryKey;
  const sub = subscriptions[id].fn;
  return sub(params);
}

export const setState = useStore.setState;
export const getState = useStore.getState;

export function dispatch(id: string, params?: Record<string, any>) {
  const { fn } = events[id];
  return fn({ setState, getState, params });
}

export function read(id: string, params?: Record<string, any>) {
  const { fn } = subscriptions[id];
  return fn({ state: getState(), params });
}

const useRemote: typeof useValue = (id, params) => {
  const { data } = useReactQuery([id, { params }]);
  return data;
};

const useLocal: typeof useValue = (id, params) => {
  const read = subscriptions[id].fn;
  return useStore((state) => read({ state, params }));
};

const useValueImpl: typeof useValue = (id, params) => {
  const useVal = subscriptions[id].async ? useRemote : useLocal;
  return useVal(id, params);
};

const useDispatchImpl: typeof useDispatch = (id) => {
  const { fn } = events[id];
  return useCallback((params) => fn({ setState, getState, params }), [fn]);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFn,
      suspense: true,
    },
  },
});

export const invalidateAsyncSub = async <T extends keyof Subs>(
  id: T,
  params?: Subs[T]['params']
) => {
  await queryClient.invalidateQueries({ queryKey: [id, { params }] });
};

export const invalidateAsyncSubs = async <T extends keyof Subs>(
  subs: Array<[id: T, params?: Subs[T]['params']]>
) => {
  await Promise.all(subs.map(([id, params]) => invalidateAsyncSub(id, params)));
};

export const Store = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreInterface useDispatch={useDispatchImpl} useValue={useValueImpl}>
        {children}
      </StoreInterface>
    </QueryClientProvider>
  );
};
