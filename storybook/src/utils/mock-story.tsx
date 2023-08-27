import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { ComponentProps, ComponentType, ReactNode, useCallback } from 'react';
import { Parameters } from '@storybook/react';
import { Store as StoreInterface } from '@elements/store/interface';
import { Subs } from '@elements/store/types';

export type SubMock = keyof Subs;
export type EvtMock = string[];

interface MockStoreProps<T extends keyof Subs> {
  sub: Record<T, any>;
  evt: EvtMock;
  children: ReactNode;
  locales?: Record<string, any>;
}

interface MockStoryProps<T extends ComponentType> {
  args?: ComponentProps<T>;
  store: {
    sub: SubMock;
    evt: EvtMock;
  };
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

export const MockStore = <T extends keyof Subs>({
  sub,
  evt,
  children,
  locales,
}: MockStoreProps<T>) => {
  const useValueImpl = useCallback(
    function (id: T, params?: Subs[T]['params']) {
      const fnOrValue = sub[id];
      if (typeof fnOrValue === 'function') {
        return fnOrValue(params);
      }
      return fnOrValue as Subs[T]['result'];
    },
    [sub]
  );

  const useDispatchImpl = useCallback(
    (id: string, _options?: Record<string, any>) => {
      if (!evt) {
        return {};
      }
      const actionsObj = createActions(evt);
      return actionsObj[id];
    },
    [evt]
  );

  return (
    <StoreInterface useDispatch={useDispatchImpl} useValue={useValueImpl}>
      <Translation defaultLocale={'en'} locales={locales || translations} suspenseLines={8}>
        {children}
      </Translation>
    </StoreInterface>
  );
};

export function mockStory<T extends ComponentType>({
  store,
  args,
  render,
  parameters,
}: MockStoryProps<T>) {
  return {
    args: store.sub,
    render: (args_: Record<string, any>) => {
      return (
        <MockStore evt={store.evt} sub={args_}>
          {render(args)}
        </MockStore>
      );
    },
    parameters,
  };
}
