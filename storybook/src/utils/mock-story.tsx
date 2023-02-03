import { Dispatch, Store } from '@elements/store';
import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { toEDNString } from 'edn-data';
import { isEqual } from 'lodash';
import { memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import { proxy, subscribe as listen } from 'valtio';

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

function copyToClipboard(s: string) {
  navigator.clipboard.writeText(s).then(console.log, console.error);
}

const CopyStoreEdn = ({ storeEdnString }: { storeEdnString: string }) => {
  const onClick = useCallback(() => copyToClipboard(storeEdnString), [storeEdnString]);
  const label = 'Copy store as EDN';

  return (
    <button
      className={
        'z-100 fixed bottom-2 right-2 rounded-md border border-gray-200 px-1 py-0.5 text-xs text-gray-500'
      }
      type={'submit'}
      onClick={onClick}>
      {label}
    </button>
  );
};

function storeEdn(store: { read: ReadMock; dispatch: DispatchMock }) {
  const subs = Object.keys(store.read)
    .sort()
    .reduce((res: Array<any>, key) => {
      return [...res, [{ key }, { sym: 'get-' + key.split('/')[1] }]];
    }, []);

  const events = store.dispatch.sort().reduce((res: Array<any>, key) => {
    return [...res, [{ key }, { sym: 'handle-' + key.split('/')[1] }]];
  }, []);

  return toEDNString({
    map: [
      [{ key: 'subs' }, { map: subs }],
      [{ key: 'events' }, { map: events }],
    ],
  });
}

function createActions(actions: string[]) {
  return actions.reduce((o: any, actionId) => {
    return {
      ...o,
      [actionId]: (params?: { [key: string]: any }) => action(actionId)(params),
    };
  }, {});
}

const checkPending = (value: any) => value === 'signal/pending';

export const MockStore = memo(({ read, dispatch, children, locales }: MockStoreProps) => {
  const stateRef = useRef<any>(proxy(read));
  const listenersRef = useRef<Function[]>([]);

  const _subscribe = useCallback((onStoreChange: any) => {
    console.log('subs');
    listenersRef.current.push(onStoreChange);
    return () => {};
  }, []);

  const _read = useCallback((key: any, params?: any) => {
    const fnOrValue = stateRef.current[key];
    if (typeof fnOrValue === 'function') {
      return fnOrValue(params);
    }
    return fnOrValue;
  }, []);

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

  useEffect(() => {
    listen(stateRef.current, () => {
      for (const listener of listenersRef.current) {
        listener();
      }
    });
  }, []);

  useEffect(() => {
    for (const k in read) {
      if (!isEqual(stateRef.current[k], read[k])) {
        stateRef.current[k] = read[k];
      }
    }
  }, [read]);

  return (
    <Store checkPending={checkPending} dispatch={_dispatch} read={_read} subscribe={_subscribe}>
      <Translation defaultLocale={'en'} locales={locales || translations}>
        {children}
      </Translation>
    </Store>
  );
});

export const mockStory = ({ store, render }: IConnectedStory) => {
  return {
    args: store.read,
    render: (args: Record<string, any>) => {
      const storeEdnString = storeEdn(store);
      return (
        <MockStore dispatch={store.dispatch} read={args}>
          {render()}
          <CopyStoreEdn storeEdnString={storeEdnString} />
        </MockStore>
      );
    },
  };
};
