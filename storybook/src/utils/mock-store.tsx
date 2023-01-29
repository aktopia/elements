import { Dispatch, Read, Store, Subscribe } from '@elements/store';
import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { ReactNode, useCallback } from 'react';

const subscribe: Subscribe = (_) => () => null;

interface MockStoreProps {
  read?: { [key: string]: any };
  dispatch?: { [key: string]: any };
  children: ReactNode;
  locales?: Record<string, any>;
}

export const MockStore = ({ read, dispatch, children, locales }: MockStoreProps) => {
  const _read = useCallback<Read>(
    (key, params) => {
      const fnOrValue = read && read[key];
      if (typeof fnOrValue === 'function') {
        return fnOrValue(params);
      }
      return fnOrValue;
    },
    [read]
  );

  const _dispatch = useCallback<Dispatch>(
    (key, params?) => dispatch && dispatch[key](params),
    [dispatch]
  );

  return (
    <Store read={_read} dispatch={_dispatch} subscribe={subscribe}>
      <Translation defaultLocale={'en'} locales={locales || translations}>
        {children}
      </Translation>
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
