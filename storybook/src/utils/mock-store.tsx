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
    (key, args) => dispatch && dispatch[key](...args),
    [dispatch]
  );

  return (
    <Store read={_read} dispatch={_dispatch} subscribe={subscribe}>
      {children}
    </Store>
  );
};

type Action = [actionId: string, ...argNames: Array<string>];

export function createActions(actions: Action[]) {
  return actions.reduce((o: any, [actionId, ...argNames]) => {
    return {
      ...o,
      [actionId]: (...args: any[]) =>
        action(actionId)(
          argNames.reduce((obj: any, argName, i: number) => {
            return { ...obj, [argName]: args[i] };
          }, {})
        ),
    };
  }, {});
}
