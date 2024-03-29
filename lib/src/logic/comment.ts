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
import type { Ident } from '@elements/types';
import { evt, remoteSub, sub } from '@elements/store/register';

export type Subs = {
  'comment/status': Sub<{ 'comment/id': string }, string>;
  'comment/created-at': Sub<{ 'comment/id': string }, number>;
  'comment/text': Sub<{ 'comment/id': string }, string>;
  'comment/ids': Sub<{ ref: Ident }, string[]>;
  'comment.deletion/id': Sub<{}, string>;
  'comment.created-by/name': Sub<{ 'comment/id': string }, string>;
  'new.comment/error': Sub<{ ref: Ident }, string>;
  'comment/replying': Sub<{ ref: Ident }, boolean>;
  'comment/can-update': Sub<{ ref: Ident }, boolean>;
  'comment/can-delete': Sub<{ ref: Ident }, boolean>;
};

export type Events = {
  'comment.text/edit': Evt<{ 'comment/id': string }>;
  'new.comment/create': Evt<{ ref: Ident }>;
  'new.comment/update': Evt<{ ref: Ident; value: string }>;
  'new.comment.error/set': Evt<{ ref: Ident; error: string }>;
  'new.comment.error/clear': Evt<{ ref: Ident }>;
  'comment.deletion/cancel': Evt<{}>;
  'comment.deletion/start': Evt<{ 'comment/id': string }>;
  'comment/delete': Evt<{ 'comment/id': string }>;
  'comment.replying/set': Evt<{ ref: Ident; replying: boolean }>;
};

export const commentSlice = () => ({
  'comment/state': {
    'comment.deletion/id': null,
    'new/comment': {},
    'comment/replying': {},
  },
});

remoteSub('comment/status');
remoteSub('comment.created-by/name');
remoteSub('comment/created-at');
remoteSub('comment/text');
remoteSub('comment/ids');
remoteSub('comment/can-update');
remoteSub('comment/can-delete');

sub('comment.deletion/id', ({ state }) => state['comment/state']['comment.deletion/id']);

sub('new.comment/error', ({ state, params }) => {
  const key = ref(params.ref);
  return state['comment/state']['new/comment'][key]?.error;
});

sub('comment/replying', ({ state, params }) => {
  const key = ref(params.ref);
  return state['comment/state']['comment/replying'][key];
});

evt('comment.replying/set', ({ setState, params }) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['comment/state']['comment/replying'][key]
      ? (state['comment/state']['comment/replying'][key] = params.replying)
      : (state['comment/state']['comment/replying'][key] = { replying: params.replying });
  });
});

evt('new.comment/create', async ({ getState, params, dispatch, invalidateAsyncSub }) => {
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

  dispatch('comment.replying/set', { ref: params.ref, replying: false });

  await invalidateAsyncSub(['comment/ids', params]);
});

evt('new.comment/update', ({ setState, params, getState, dispatch }) => {
  const key = ref(params.ref);
  const error = getState()['comment/state']['new/comment'][key]?.error;

  if (error) {
    dispatch('new.comment.error/clear', { ref: params.ref });
  }

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

evt('comment/delete', async ({ setState, params, invalidateAsyncSub }) => {
  await rpcPost('comment/delete', {
    'comment/id': params['comment/id'],
  });

  setState((state: any) => {
    state['comment/state']['comment.deletion/id'] = null;
  });

  await invalidateAsyncSub(['comment/status', { 'comment/id': params['comment/id'] }]);
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

evt('new.comment.error/clear', ({ setState, params }) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['comment/state']['new/comment'][key].error = null;
  });
});

registerTextEditor('comment/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params, dispatch, replaceAsyncSub }) => {
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
    replaceAsyncSub(['comment/text', { 'comment/id': params.ref[1] }], value);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
