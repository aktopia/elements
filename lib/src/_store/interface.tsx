import { createContext, memo, ReactNode, useCallback, useContext, useMemo } from 'react';

type ValueHook = <T>(id: string, params?: Record<string, any>) => T;
type DispatchHook = (id: string, options?: Record<string, any>) => void;

interface StoreContextType {
  useValueImpl: ValueHook;
  useDispatchImpl: DispatchHook;
}

const placeholderContext: StoreContextType = {
  useValueImpl: (_id, _params) => {
    throw new Error('"useValueImpl" not set for StoreContext');
  },
  useDispatchImpl: (_id, _params) => {
    throw new Error('"useDispatchImpl" not set for StoreContext');
  },
};

export const StoreContext = createContext<StoreContextType>(placeholderContext);

export function useValue<T>(id: string, params?: Record<string, any>): T {
  const { useValueImpl } = useContext(StoreContext);
  return useValueImpl<T>(id, params);
}

export function useDispatch(id: string, options?: Record<string, any>): any {
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
