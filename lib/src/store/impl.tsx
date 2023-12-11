import { QueryClient, QueryClientProvider, useQuery as useReactQuery } from 'react-query';
import { create } from 'zustand';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import {
  type Dispatch,
  type DispatchHook,
  type Read,
  Store as StoreInterface,
  type ValueHook,
} from '@elements/store/interface';
import { events, subscriptions } from '@elements/store/register';
import { slices } from '@elements/store/slices';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { Subs } from '@elements/store/types';

function queryFn({ queryKey }: any) {
  const [id, params] = queryKey;
  const sub = subscriptions[id].fn;
  return sub(params);
}

const useStore = create(
  immer(
    devtools(() => {
      return slices.reduce((acc, slice) => {
        return { ...acc, ...slice() };
      }, {});
    })
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFn,
      suspense: true,
    },
  },
});

export const setState = useStore.setState;
export const getState = useStore.getState;

export const dispatch: Dispatch = (id, params?) => {
  const { fn } = events[id];
  return fn({ setState, getState, params, read, dispatch });
};

export const read: Read = (id, params?) => {
  const { fn, async } = subscriptions[id];
  return async
    ? queryClient.getQueryState([id, { params }])?.data
    : fn({ state: getState(), params });
};

const useRemote: ValueHook = (id, params) => {
  const { data } = useReactQuery([id, { params }]);
  return data;
};

const useLocal: ValueHook = (id, params) => {
  const read = subscriptions[id].fn;
  return useStore((state) => read({ state, params }));
};

const useValueImpl: ValueHook = (id, params) => {
  const useVal = subscriptions[id].async ? useRemote : useLocal;
  return useVal(id, params);
};

const useDispatchImpl: DispatchHook = (id) => {
  return useCallback((params) => dispatch(id, params), [id]);
};

export const invalidateAsyncSub = async <T extends keyof Subs>(
  sub: [id: T, params?: Subs[T]['params']]
) => {
  const [id, params] = sub;
  await queryClient.invalidateQueries({ queryKey: [id, { params }] });
};

export const invalidateAsyncSubs = async <T extends keyof Subs>(
  subs: Array<[id: T, params?: Subs[T]['params']]>
) => {
  await Promise.all(subs.map(([id, params]) => invalidateAsyncSub([id, params])));
};

export const replaceAsyncSub = <T extends keyof Subs>(
  sub: [id: T, params?: Subs[T]['params']],
  updater: Subs[T]['result'] | ((old: Subs[T]['result']) => Subs[T]['result'])
) => {
  const [id, params] = sub;
  queryClient.setQueryData([id, { params }], updater);
};

export const replaceAsyncSubs = <T extends keyof Subs>(
  subs: Array<
    [
      [id: T, params?: Subs[T]['params']],
      updater: Subs[T]['result'] | ((old: Subs[T]['result']) => Subs[T]['result']),
    ]
  >
) => {
  for (const sub of subs) {
    const [[id, params], updater] = sub;
    queryClient.setQueryData([id, { params }], updater);
  }
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
