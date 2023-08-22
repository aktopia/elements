import { createContext, memo, ReactNode, useCallback, useContext, useMemo } from 'react';
import { Events, Subs } from '@elements/store/types';

type ValueHook = <T extends keyof Subs>(id: T, params?: Subs[T]['params']) => Subs[T]['result'];
type DispatchHook = <T extends keyof Events>(
  id: T,
  options?: Record<string, any>
) => (params: Events[T]['params']) => void;

interface StoreContextType {
  useValueImpl: ValueHook;
  useDispatchImpl: DispatchHook;
}

const placeholderContext: StoreContextType = {
  useValueImpl: (_id, _params) => {
    throw new Error('"useValueImpl" not set for StoreContext');
  },
  useDispatchImpl: (_id, _options) => {
    throw new Error('"useDispatchImpl" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export function useValue<T extends keyof Subs>(
  id: T,
  params?: Subs[T]['params']
): Subs[T]['result'] {
  const { useValueImpl } = useContext(StoreContext);
  return useValueImpl<T>(id, params);
}

export function useDispatch<T extends keyof Events>(
  id: T,
  options?: Record<string, any>
): (params: Events[T]['params']) => void {
  const { useDispatchImpl } = useContext(StoreContext);
  return useDispatchImpl(id, options);
}

export function useState(valueId: string, dispatchId: string): [any, (value: any) => void] {
  const value = useValue(valueId);
  const dispatch = useDispatch(dispatchId);
  const setValue = useCallback((value: any) => dispatch({ value }), [dispatch]);
  return [value, setValue];
}

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
