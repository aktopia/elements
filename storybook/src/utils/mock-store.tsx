import { Dispatch, Read, Store, Subscribe } from '@elements/store';
import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { ReactNode, useCallback } from 'react';

const subscribe: Subscribe = (_) => () => null;

interface MockStoreProps {
  read?: { [key: string]: any };
  dispatch?: string[];
  children: ReactNode;
  locales?: Record<string, any>;
}

function createActions(actions: string[]) {
  return actions.reduce((o: any, actionId) => {
    return {
      ...o,
      [actionId]: (params?: { [key: string]: any }) => action(actionId)(params),
    };
  }, {});
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
    (key, params?) => {
      if (!dispatch) {
        return {};
      }
      const actionsObj = createActions(dispatch);
      return actionsObj[key](params);
    },
    [dispatch]
  );

  return (
    <Store dispatch={_dispatch} read={_read} subscribe={subscribe}>
      <Translation defaultLocale={'en'} locales={locales || translations}>
        {children}
      </Translation>
    </Store>
  );
};
