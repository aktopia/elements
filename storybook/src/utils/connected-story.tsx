import { Dispatch, Read, Store, Subscribe } from '@elements/store';
import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { ReactNode, useCallback } from 'react';

const subscribe: Subscribe = (_) => () => null;

export type ReadMock = Record<string, any>;
export type DispatchMock = string[];

interface MockStoreProps {
  read?: ReadMock;
  dispatch?: DispatchMock;
  children: ReactNode;
  locales?: Record<string, any>;
}

interface IConnectedStory {
  store: { read: ReadMock; dispatch: DispatchMock };
  render: () => JSX.Element;
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

export const connectedStory = ({ store, render }: IConnectedStory) => {
  return {
    args: store.read,
    render: (args: any) => {
      return (
        <MockStore dispatch={store.dispatch} read={args}>
          {render()}
        </MockStore>
      );
    },
  };
};