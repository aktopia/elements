import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';
import type { Evt, Sub } from '@elements/store/types';
import type { LookupRef } from '@elements/types';

export type Subs = {
  'update/ids': Sub<{ ref: LookupRef }, string[]>;
  'update.created-by/name': Sub<{ 'update/id': string }, string>;
  'update/created-at': Sub<{ 'update/id': string }, number>;
  'update/text': Sub<{ 'update/id': string }, string>;
  'update.deletion/id': Sub<{}, string>;
};

export type Events = {
  'new.update/create': Evt<{ ref: LookupRef }>;
  'new.update/update': Evt<{ ref: LookupRef; value: string }>;
  'update.deletion/cancel': Evt<{}>;
  'update.deletion/start': Evt<{ 'update/id': string }>;
  'update.text/edit': Evt<{ 'update/id': string }>;
  'update/delete': Evt<{ 'update/id': string; ref: LookupRef }>;
};

export const updateSlice = () => ({
  'update/state': {
    'update.deletion/id': null,
    'new/update': {},
  },
});

sub('update.deletion/id', ({ state }) => state['update/state']['update.deletion/id']);

remoteSub('update/ids');
remoteSub('update/created-at');
remoteSub('update.created-by/name');
remoteSub('update/text');

evt('new.update/create', async ({ getState }) => {
  const newUpdate = getState()['update/state']['new/update'];
  await rpcPost('update/create', {
    ref: newUpdate.ref,
    value: newUpdate.text,
  });
  await invalidateAsyncSub('update/ids', { ref: newUpdate.ref });
});

evt('new.update/update', ({ setState, params }) => {
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

  await invalidateAsyncSub('update/ids', { ref: params.ref });
});

evt('update.text/edit', ({ setState, params }) => {
  startEditing({
    setState,
    params: { ref: ['update/text', params['update/id']] },
  });
});

registerTextEditor('update/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const value = text({ state: getState(), params });
    await rpcPost('update.text/update', {
      'update/id': params.ref[1],
      value,
    });
    await invalidateAsyncSub('update/text', { 'update/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
