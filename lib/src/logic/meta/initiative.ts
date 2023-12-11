import { evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import {
  endEditing,
  onEditCancelDefault,
  onTextUpdateDefault,
  registerTextEditor,
  startEditing,
  text,
} from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';
import { type Match } from '@elements/utils/router';
import type { Evt, Sub } from '@elements/store/types';

export enum Status {
  Evaluating = 'meta.initiative.status/evaluating',
  Planning = 'meta.initiative.status/planning',
  Planned = 'meta.initiative.status/planned',
  InProgress = 'meta.initiative.status/in-progress',
}

export type Subs = {
  'current.meta.initiative/slug': Sub<{}, string>;
  'meta.initiative.title/text': Sub<{ 'meta.initiative/slug': string }, string>;
  'meta.initiative.title/can-edit': Sub<{ 'meta.initiative/slug': string }, boolean>;
  'meta.initiative.tabs/active-tab': Sub<{}, string>;
  'meta.initiative/updated-at': Sub<{ 'meta.initiative/slug': string }, number>;
  'meta.initiative.description/text': Sub<{ 'meta.initiative/slug': string }, string>;
  'meta.initiative.description/can-edit': Sub<{}, boolean>;
  'meta.initiative/slugs': Sub<{}, string[]>;
  'meta.initiative/status': Sub<{ 'meta.initiative/slug': string }, Status>;
  'meta.initiative.status/can-edit': Sub<{ 'meta.initiative/slug': string }, boolean>;
};

export type Events = {
  'meta.initiative.title/edit': Evt<{}>;
  'meta.initiative.description/edit': Evt<{}>;
  'navigated.meta.initiative/view': Evt<{ route: Match }>;
  'meta.initiative.tabs/update': Evt<{ 'tab/id': string }>;
  'current.meta.initiative.id/set': Evt<{ 'meta.initiative/slug': string }>;
  'meta.initiative.status/update': Evt<{ 'meta.initiative/slug': string; status: Status }>;
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
    params: { ref: ['meta.initiative.title/text', currentInitiativeSlug] },
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

evt('navigated.meta.initiative/view', ({ params, dispatch }) => {
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

  await invalidateAsyncSub([
    'meta.initiative/status',
    {
      'meta.initiative/slug': params['meta.initiative/slug'],
    },
  ]);
});

registerTextEditor('meta.initiative.title/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ getState, params });
    await rpcPost('meta.initiative.title.text/update', {
      'meta.initiative/slug': params.ref[1],
      value: title,
    });
    await invalidateAsyncSub([
      'meta.initiative.title/text',
      {
        'meta.initiative/slug': params.ref[1],
      },
    ]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});

registerTextEditor('meta.initiative.description/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ getState, params });
    await rpcPost('meta.initiative.description.text/update', {
      'meta.initiative/slug': params.ref[1],
      value: description,
    });
    await invalidateAsyncSub([
      'meta.initiative.description/text',
      {
        'meta.initiative/slug': params.ref[1],
      },
    ]);
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
