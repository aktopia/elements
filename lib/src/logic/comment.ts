import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import { ref } from '@elements/utils';
import {
  endEditing,
  onEditCancelDefault,
  onTextUpdateDefault,
  registerTextEditor,
  startEditing,
  text,
} from '@elements/logic/text-editor';
import type { Evt, Sub } from '@elements/store/types';
import type { LookupRef } from '@elements/types';

export type Subs = {
  'comment/status': Sub<{ 'comment/id': string }, string>;
  'comment/created-at': Sub<{ 'comment/id': string }, number>;
  'comment/text': Sub<{ 'comment/id': string }, string>;
  'comment/ids': Sub<{ ref: LookupRef }, string[]>;
  'comment.deletion/id': Sub<{}, string>;
  'comment.created-by/name': Sub<{ 'comment/id': string }, string>;
  'new.comment/error': Sub<{ ref: LookupRef }, string>;
};

export type Events = {
  'comment.text/edit': Evt<{ 'comment/id': string }>;
  'new.comment/create': Evt<{ ref: LookupRef }>;
  'new.comment/update': Evt<{ ref: LookupRef; value: string }>;
  'new.comment.error/set': Evt<{ ref: LookupRef; error: string }>;
  'comment.deletion/cancel': Evt<{}>;
  'comment.deletion/start': Evt<{ 'comment/id': string }>;
  'comment/delete': Evt<{ 'comment/id': string }>;
};

export const commentSlice = () => ({
  'comment/state': {
    'comment.deletion/id': null,
    'new/comment': {},
  },
});

remoteSub('comment/status');
remoteSub('comment.created-by/name');
remoteSub('comment/created-at');
remoteSub('comment/text');
remoteSub('comment/ids');

sub('comment.deletion/id', ({ state }) => state['comment/state']['comment.deletion/id']);

sub('new.comment/error', ({ state, params }) => {
  const key = ref(params.ref);
  return state['comment/state']['new/comment'][key]?.error;
});

evt('new.comment/create', async ({ getState, params, dispatch }) => {
  const key = ref(params.ref);
  const newComment = getState()['comment/state']['new/comment'][key]?.text?.trim();

  if (newComment === '') {
    return dispatch('new.comment.error/set', {
      ref: params.ref,
      error: 'Comment cannot be empty.',
    });
  }

  await rpcPost('comment/create', {
    ...params,
    value: newComment,
  });

  await invalidateAsyncSub('comment/ids', params);
});

evt('new.comment/update', ({ setState, params }) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['comment/state']['new/comment'][key]
      ? (state['comment/state']['new/comment'][key].text = params.value)
      : (state['comment/state']['new/comment'][key] = { text: params.value });
  });
});

evt('comment.deletion/cancel', ({ setState }) => {
  setState((state: any) => {
    state['comment/state']['comment.deletion/id'] = null;
  });
});

evt('comment.deletion/start', ({ setState, params }) => {
  setState((state: any) => {
    state['comment/state']['comment.deletion/id'] = params['comment/id'];
  });
});

evt('comment/delete', async ({ setState, params }) => {
  await rpcPost('comment/delete', {
    'comment/id': params['comment/id'],
  });

  setState((state: any) => {
    state['comment/state']['comment.deletion/id'] = null;
  });

  await invalidateAsyncSub('comment/status', { 'comment/id': params['comment/id'] });
});

evt('comment.text/edit', ({ setState, params }) => {
  startEditing({
    setState,
    params: { ref: ['comment/text', params['comment/id']] },
  });
});

evt('new.comment.error/set', ({ setState, params }) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['comment/state']['new/comment'][key].error = params.error;
  });
});

registerTextEditor('comment/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params, dispatch }) => {
    const value = text({ getState, params })?.trim();
    if (value === '') {
      return dispatch('new.comment.error/set', {
        ref: params.ref,
        error: 'Comment cannot be empty.',
      });
    }
    await rpcPost('comment.text/update', {
      'comment/id': params.ref[1],
      value,
    });
    await invalidateAsyncSub('comment/text', { 'comment/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
