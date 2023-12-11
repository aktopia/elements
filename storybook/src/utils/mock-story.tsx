import { Translation } from '@elements/translation';
import translations, { type Translations } from '@elements/translations';
import { action } from '@storybook/addon-actions';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { useCallback } from 'react';
import type { Parameters } from '@storybook/react';
import type { ValueHook } from '@elements/store/interface';
import { Store as StoreInterface } from '@elements/store';
import type { Subs } from '@elements/store/types';

export type SubMock = keyof Subs;
export type EvtMock = string[];

interface MockStoreProps<T extends keyof Subs> {
  sub: Record<T, any>;
  evt: EvtMock;
  children: ReactNode;
  locales?: Record<keyof Translations, any>;
}

export interface MockStore {
  sub: Partial<Record<keyof Subs, any>>; // Extra property checks don't work on Object spread unfortunately
  evt: EvtMock;
}

interface MockStoryProps<T extends ComponentType<ComponentProps<T>>> {
  args: ComponentProps<T>;
  store: MockStore;
  render: (args: ComponentProps<T>) => JSX.Element;
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
  locales = translations,
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
  ) as ValueHook;

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
      <Translation defaultLocale={'en'} locales={locales} suspenseLines={8}>
        {children}
      </Translation>
    </StoreInterface>
  );
};

export function mockStory<T extends ComponentType<ComponentProps<T>>>({
  store,
  args,
  render,
  parameters,
}: MockStoryProps<T>) {
  return {
    args: store.sub,
    render: (args_: Record<keyof Subs, any>) => {
      return (
        <MockStore evt={store.evt} sub={args_}>
          {render(args)}
        </MockStore>
      );
    },
    parameters,
  };
}
