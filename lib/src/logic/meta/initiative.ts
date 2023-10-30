import { sub, evt, invalidateAsyncSub, dispatch, remoteSub } from '@elements/store';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';
import { type Match } from '@elements/router';

export enum Status {
  Evaluating = 'meta.initiative.status/evaluating',
  Planning = 'meta.initiative.status/planning',
  Planned = 'meta.initiative.status/planned',
  InProgress = 'meta.initiative.status/in-progress',
}

export type Subs = {
  'current.meta.initiative/slug': {
    params: {};
    result: string;
  };
  'meta.initiative.title/text': {
    params: { 'meta.initiative/slug': string };
    result: string;
  };
  'meta.initiative.title/can-edit': {
    params: { 'meta.initiative/slug': string };
    result: boolean;
  };
  'meta.initiative.tabs/active-tab': {
    params: {};
    result: string;
  };
  'meta.initiative/updated-at': {
    params: { 'meta.initiative/slug': string };
    result: number;
  };
  'meta.initiative.description/text': {
    params: { 'meta.initiative/slug': string };
    result: string;
  };
  'meta.initiative.description/can-edit': {
    params: {};
    result: boolean;
  };
  'meta.initiative/slugs': {
    params: {};
    result: string[];
  };
  'meta.initiative/status': {
    params: { 'meta.initiative/slug': string };
    result: Status;
  };
  'meta.initiative.status/can-edit': {
    params: { 'meta.initiative/slug': string };
    result: boolean;
  };
};

export type Events = {
  'meta.initiative.title/edit': {
    params: {};
  };
  'meta.initiative.description/edit': {
    params: {};
  };
  'navigated.meta.initiative/view': {
    params: {
      route: Match;
    };
  };
  'meta.initiative.tabs/update': {
    params: {
      'tab/id': string;
    };
  };
  'current.meta.initiative.id/set': {
    params: {
      'meta.initiative/slug': string;
    };
  };
  'meta.initiative.status/update': {
    params: {
      'meta.initiative/slug': string;
      status: Status;
    };
  };
};

export const metaInitiativeSlice = () => ({
  'meta.initiative/state': {
    'meta.initiative.tabs:active-tab': 'discussion',
  },
});

sub(
  'current.meta.initiative/slug',
  ({ state }) => state['meta.initiative/state']['current.meta.initiative/slug']
);

sub(
  'meta.initiative.tabs/active-tab',
  ({ state }) => state['meta.initiative/state']['meta.initiative.tabs/active-tab']
);

remoteSub('meta.initiative/slugs');
remoteSub('meta.initiative.title/text');
remoteSub('meta.initiative.title/can-edit');
remoteSub('meta.initiative.description/text');
remoteSub('meta.initiative.description/can-edit');
remoteSub('meta.initiative/updated-at');
remoteSub('meta.initiative/status');
remoteSub('meta.initiative.status/can-edit');

evt('current.meta.initiative.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['meta.initiative/state']['current.meta.initiative/slug'] = params['meta.initiative/slug'];
  });
});

evt('meta.initiative.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state['meta.initiative/state']['meta.initiative.tabs/active-tab'] = params['tab/id'];
  });
});

evt('meta.initiative.title/edit', ({ setState, getState }) => {
  const currentInitiativeSlug = getState()['meta.initiative/state']['current.meta.initiative/slug'];

  startEditing({
    setState,
    params: { ref: ['meta.initiative.description/text', currentInitiativeSlug] },
  });
});

evt('meta.initiative.description/edit', ({ setState, getState }) => {
  const currentInitiativeSlug = getState()['meta.initiative/state']['current.meta.initiative/slug'];

  startEditing({
    setState,
    params: {
      ref: ['meta.initiative.description/text', currentInitiativeSlug],
    },
  });
});

evt('navigated.meta.initiative/view', ({ params }) => {
  const id = params.route.pathParams.id;
  const tab = params.route.hashParams.tab;
  if (tab) {
    dispatch('meta.initiative.tabs/update', { 'tab/id': tab });
  }
  dispatch('current.meta.initiative.id/set', { 'meta.initiative/slug': id });
  dispatch('route.navigation/complete');
});

evt('meta.initiative.status/update', async ({ params }) => {
  await rpcPost('meta.initiative.status/update', {
    'meta.initiative/slug': params['meta.initiative/slug'],
    status: params.status,
  });

  await invalidateAsyncSub('meta.initiative/status', {
    'meta.initiative/slug': params['meta.initiative/slug'],
  });
});

registerTextEditor('meta.initiative.title/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ state: getState(), params });
    await rpcPost('meta.initiative.title.text/update', {
      'meta.initiative/slug': params['ref/id'],
      value: title,
    });
    await invalidateAsyncSub('meta.initiative.title/text', {
      'meta.initiative/slug': params['ref/id'],
    });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('meta.initiative.description/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ state: getState(), params });
    await rpcPost('meta.initiative.description.text/update', {
      'meta.initiative/slug': params['ref/id'],
      value: description,
    });
    await invalidateAsyncSub('meta.initiative.description/text', {
      'meta.initiative/slug': params['ref/id'],
    });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
