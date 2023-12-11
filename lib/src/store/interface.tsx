import type { ReactNode } from 'react';
import { createContext, memo, useContext, useMemo } from 'react';
import type { Events, Subs } from '@elements/store/types';

export type Read = <T extends keyof Subs>(id: T, params?: Subs[T]['params']) => Subs[T]['result'];
export type Dispatch = <T extends keyof Events>(
  id: T,
  params?: Events[T]['params']
) => void | Promise<void>;

export type ValueHook = <T extends keyof Subs>(
  id: T,
  params?: Subs[T]['params']
) => Subs[T]['result'];

export type DispatchHook = <T extends keyof Events>(
  id: T
) => (params: Events[T]['params']) => void | Promise<void>;

export type InvalidateAsyncSub = <T extends keyof Subs>(
  sub: [id: T, params: Subs[T]['params'] | undefined]
) => Promise<void>;

export type InvalidateAsyncSubs = <T extends keyof Subs>(
  subs: [id: T, params: Subs[T]['params'] | undefined][]
) => Promise<void>;

export type ReplaceAsyncSub = <T extends keyof Subs>(
  sub: [id: T, params: Subs[T]['params'] | undefined],
  updater: Subs[T]['result'] | ((old: Subs[T]['result']) => Subs[T]['result'])
) => void;

export type ReplaceAsyncSubs = <T extends keyof Subs>(
  subs: [
    sub: [id: T, params: Subs[T]['params'] | undefined],
    updater: Subs[T]['result'] | ((old: Subs[T]['result']) => Subs[T]['result']),
  ][]
) => void;

interface StoreContextType {
  useValueImpl: ValueHook;
  useDispatchImpl: DispatchHook;
}

const placeholderContext: StoreContextType = {
  useValueImpl: (_id, _params) => {
    throw new Error('"useValueImpl" not set for StoreContext');
  },
  useDispatchImpl: (_id) => {
    throw new Error('"useDispatchImpl" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export const useValue: ValueHook = (id, params?) => {
  const { useValueImpl } = useContext(StoreContext);
  return useValueImpl(id, params);
};

export const useDispatch: DispatchHook = (id) => {
  const { useDispatchImpl } = useContext(StoreContext);
  return useDispatchImpl(id);
};

interface StoreProps {
  useValue: ValueHook;
  useDispatch: DispatchHook;
  children: ReactNode;
}

export const Store = memo(({ useValue, useDispatch, children }: StoreProps) => {
  const ctx = useMemo(
    () => ({
      useValueImpl: useValue,
      useDispatchImpl: useDispatch,
    }),
    [useValue, useDispatch]
  );

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
});
