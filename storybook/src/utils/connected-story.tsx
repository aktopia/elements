import { Dispatch, Read, Store, Subscribe } from '@elements/store';
import { Translation } from '@elements/translation';
import translations from '@elements/translations';
import { action } from '@storybook/addon-actions';
import { toEDNString } from 'edn-data';
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

function copyTextToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}

const CopyStoreEdn = ({ storeEdnString }: { storeEdnString: string }) => {
  const onClick = useCallback(() => copyTextToClipboard(storeEdnString), [storeEdnString]);
  const label = 'Copy store as EDN';

  return (
    <button
      className={
        'fixed bottom-2 right-2 rounded-md border border-gray-200 px-1 py-0.5 text-xs text-gray-500'
      }
      type={'submit'}
      onClick={onClick}>
      {label}
    </button>
  );
};

export const connectedStory = ({ store, render }: IConnectedStory) => {
  return {
    args: store.read,
    render: (args: any) => {
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
