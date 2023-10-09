import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import pick from 'lodash/pick';
import { rpcPost } from '@elements/rpc';
import { ref } from '@elements/utils';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';

export type Subs = {
  'comment/status': {
    params: {
      'comment/id': string;
    };
    result: string;
  };
  'comment/created-at': {
    params: {
      'comment/id': string;
    };
    result: number;
  };
  'comment/text': {
    params: {
      'comment/id': string;
    };
    result: string;
  };
  'comment/ids': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
    result: string[];
  };
  'comment.deletion/id': {
    params: {};
    result: string;
  };
  'comment.created-by/name': {
    params: {
      'comment/id': string;
    };
    result: string;
  };
};

export type Events = {
  'comment.text/edit': {
    params: {
      'comment/id': string;
    };
  };
  'new.comment/create': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'new.comment/update': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
      value: string;
    };
  };
  'comment.deletion/cancel': {
    params: {};
  };
  'comment.deletion/start': {
    params: {
      'comment/id': string;
    };
  };
  'comment/delete': {
    params: {
      'comment/id': string;
    };
  };
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

evt('new.comment/create', async ({ getState, params }) => {
  const key = ref(params['ref/attribute'], params['ref/id']);
  const newComment = getState()['comment/state']['new/comment'][key];
  const reference = pick(params, ['ref/id', 'ref/attribute']);

  await rpcPost('comment/create', {
    ...reference,
    value: newComment.text,
  });

  await invalidateAsyncSub('comment/ids', reference);
});

evt('new.comment/update', ({ setState, params }) => {
  const key = ref(params['ref/attribute'], params['ref/id']);

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
    params: { 'ref/id': params['comment/id'], 'ref/attribute': 'comment/text' },
  });
});

registerTextEditor('comment/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const value = text({ state: getState(), params });
    await rpcPost('comment.text/update', {
      'comment/id': params['ref/id'],
      value,
    });
    await invalidateAsyncSub('comment/text', { 'comment/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
