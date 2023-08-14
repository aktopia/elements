import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { memo, ReactNode, useCallback } from 'react';
import { Parameters } from '@storybook/react';
import { Store as StoreInterface } from '@elements/store/interface';

export type ReadMock = Record<string, any>;
export type DispatchMock = string[];

interface MockStoreProps {
  read: ReadMock;
  dispatch: DispatchMock;
  children: ReactNode;
  locales?: Record<string, any>;
}

interface IConnectedStory {
  args?: any;
  store: { read: ReadMock; dispatch: DispatchMock };
  render: (args?: any) => JSX.Element;
  parameters?: Parameters;
}

function createActions(actions: string[]) {
  return actions.reduce((o: any, actionId) => {
    return {
      ...o,
      [actionId]: (params?: { [key: string]: any }) => action(actionId)(params),
    };
  }, {});
}

export const MockStore = memo(({ read, dispatch, children, locales }: MockStoreProps) => {
  const useValueImpl = useCallback(
    function <T>(id: string, params?: Record<string, any>) {
      const fnOrValue = read[id];
      if (typeof fnOrValue === 'function') {
        return fnOrValue(params);
      }
      return fnOrValue as T;
    },
    [read]
  );

  const useDispatchImpl = useCallback(
    (id: string, _options?: Record<string, any>) => {
      if (!dispatch) {
        return {};
      }
      const actionsObj = createActions(dispatch);
      return actionsObj[id];
    },
    [dispatch]
  );

  return (
    <StoreInterface useDispatch={useDispatchImpl} useValue={useValueImpl}>
      <Translation defaultLocale={'en'} locales={locales || translations} suspenseLines={8}>
        {children}
      </Translation>
    </StoreInterface>
  );
});

export const mockStory = ({ store, args, render, parameters }: IConnectedStory) => {
  return {
    args: store.read,
    render: (args_: Record<string, any>) => {
      return (
        <MockStore dispatch={store.dispatch} read={args_}>
          {render(args)}
        </MockStore>
      );
    },
    parameters,
  };
};
