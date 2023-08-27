import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { ComponentProps, ComponentType, memo, ReactNode, useCallback } from 'react';
import { Parameters } from '@storybook/react';
import { Store as StoreInterface } from '@elements/store/interface';

export type SubMock = Record<string, any>;
export type EvtMock = string[];

interface MockStoreProps {
  sub: SubMock;
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

export const MockStore = memo(({ sub, evt, children, locales }: MockStoreProps) => {
  const useValueImpl = useCallback(
    function <T>(id: string, params?: Record<string, any>) {
      const fnOrValue = sub[id];
      if (typeof fnOrValue === 'function') {
        return fnOrValue(params);
      }
      return fnOrValue as T;
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
});

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
