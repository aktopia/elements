import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import {
  endEditing,
  onEditCancelDefault,
  onTextUpdateDefault,
  registerTextEditor,
  setError,
  startEditing,
  text,
} from '@elements/logic/text-editor';
import type { Evt, Sub } from '@elements/store/types';
import type { LookupRef } from '@elements/types';

export type Subs = {
  'update/ids': Sub<{ ref: LookupRef }, string[]>;
  'update.created-by/name': Sub<{ 'update/id': string }, string>;
  'update/created-at': Sub<{ 'update/id': string }, number>;
  'update/text': Sub<{ 'update/id': string }, string>;
  'update.deletion/id': Sub<{}, string>;
  'update/can-create': Sub<{ ref: LookupRef }, boolean>;
  'update/can-update': Sub<{ ref: LookupRef }, boolean>;
  'update/can-delete': Sub<{ ref: LookupRef }, boolean>;
  'new.update/error': Sub<{}, string>;
};

export type Events = {
  'new.update/create': Evt<{ ref: LookupRef }>;
  'new.update/update': Evt<{ ref: LookupRef; value: string }>;
  'update.deletion/cancel': Evt<{}>;
  'update.deletion/start': Evt<{ 'update/id': string }>;
  'update.text/edit': Evt<{ 'update/id': string }>;
  'update/delete': Evt<{ 'update/id': string; ref: LookupRef }>;
  'new.update.error/set': Evt<{ error: string }>;
  'new.update.error/clear': Evt<{}>;
};

export const updateSlice = () => ({
  'update/state': {
    'update.deletion/id': null,
    'new/update': {},
  },
});

sub('update.deletion/id', ({ state }) => state['update/state']['update.deletion/id']);

sub('new.update/error', ({ state }) => {
  return state['update/state']['new/update'].error;
});

remoteSub('update/ids');
remoteSub('update/created-at');
remoteSub('update.created-by/name');
remoteSub('update/text');
remoteSub('update/can-create');
remoteSub('update/can-update');
remoteSub('update/can-delete');

evt('new.update/create', async ({ getState, dispatch, params }) => {
  const newUpdate = getState()['update/state']['new/update'].text?.trim();
  if (newUpdate === '') {
    return dispatch('new.update.error/set', { error: 'Update cannot be empty.' });
  }

  await rpcPost('update/create', {
    ref: params.ref,
    value: newUpdate,
  });
  await invalidateAsyncSub(['update/ids', { ref: params.ref }]);
});

evt('new.update/update', ({ setState, params, read, dispatch }) => {
  const error = read('new.update/error');
  if (error) {
    dispatch('new.update.error/clear');
  }
  setState((state: any) => {
    state['update/state']['new/update'].ref = params.ref;
    state['update/state']['new/update'].text = params.value;
  });
});

evt('update.deletion/cancel', ({ setState }) => {
  setState((state: any) => {
    state['update/state']['update.deletion/id'] = null;
  });
});

evt('update.deletion/start', ({ setState, params }) => {
  setState((state: any) => {
    state['update/state']['update.deletion/id'] = params['update/id'];
  });
});

evt('update/delete', async ({ setState, params }) => {
  await rpcPost('update/delete', {
    'update/id': params['update/id'],
  });

  setState((state: any) => {
    state['update/state']['update.deletion/id'] = null;
  });

  await invalidateAsyncSub(['update/ids', { ref: params.ref }]);
});

evt('update.text/edit', ({ setState, params }) => {
  startEditing({
    setState,
    params: { ref: ['update/text', params['update/id']] },
  });
});

evt('new.update.error/set', ({ setState, params }) => {
  setState((state: any) => {
    state['update/state']['new/update'].error = params.error;
  });
});

evt('new.update.error/clear', ({ setState }) => {
  setState((state: any) => {
    state['update/state']['new/update'].error = null;
  });
});

registerTextEditor('update/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const value = text({ getState, params })?.trim();

    if (value === '') {
      return setError({ setState, params: { ...params, error: 'Update cannot be empty.' } });
    }

    await rpcPost('update.text/update', {
      'update/id': params.ref[1],
      value,
    });
    await invalidateAsyncSub(['update/text', { 'update/id': params.ref[1] }]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
