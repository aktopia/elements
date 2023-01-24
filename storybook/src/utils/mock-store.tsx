import { Dispatch, Read, Store, Subscribe } from '@elements/store';
import { action } from '@storybook/addon-actions';
import { ReactNode, useCallback } from 'react';

const subscribe: Subscribe = (_) => () => null;

interface MockStoreProps {
  read?: { [key: string]: any };
  dispatch?: { [key: string]: any };
  children: ReactNode;
}

export const MockStore = ({ read, dispatch, children }: MockStoreProps) => {
  const _read = useCallback<Read>((key, _) => read && read[key], [read]);
  const _dispatch = useCallback<Dispatch>(
    (key, params?) => dispatch && dispatch[key](params),
    [dispatch]
  );

  return (
    <Store read={_read} dispatch={_dispatch} subscribe={subscribe}>
      {children}
    </Store>
  );
};

export function createActions(actions: string[]) {
  return actions.reduce((o: any, actionId) => {
    return {
      ...o,
      [actionId]: (params?: { [key: string]: any }) => action(actionId)(params),
    };
  }, {});
}
