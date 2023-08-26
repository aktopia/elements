import { dispatch, evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import { rpcPost } from '@elements/rpc';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';
import { navigate, Route } from '@elements/logic/router';

export type Subs = {
  'action.tabs/active-tab-id': {
    params: {};
    result: string;
  };
  'action.progress-bar/active-switch': {
    params: {};
    result: string;
  };
  'action/title': {
    params: {
      'action/id': string;
    };
    result: string;
  };
  'action/description': {
    params: {
      'action/id': string;
    };
    result: string;
  };
  'action/outcome': {
    params: {
      'action/id': string;
    };
    result: string;
  };
  'action.funding/percentage': {
    params: {};
    result: number;
  };
  'action/saved': {
    params: {};
    result: boolean;
  };
  'action/followed': {
    params: {};
    result: boolean;
  };
  'action.bump/count': {
    params: {};
    result: number;
  };
  'action.follow/count': {
    params: {};
    result: number;
  };
  'action.work/percentage': {
    params: {};
    result: number;
  };
  'action/updated-at': {
    params: {};
    result: number;
  };
  'current.action/id': {
    params: {};
    result: string;
  };
  'action.create.modal/title': {
    params: {};
    result: string;
  };
  'action.create.modal/visible': {
    params: {};
    result: boolean;
  };
  'action.title/can-edit': {
    params: {};
    result: boolean;
  };
  'action.description/can-edit': {
    params: {};
    result: boolean;
  };
  'action.outcome/can-edit': {
    params: {};
    result: boolean;
  };
};

export type Events = {
  'action.title/edit': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'action.description/edit': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'action.outcome/edit': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'current.action.id/set': {
    params: {
      'action/id': string;
    };
  };
  'action/volunteer': {
    params: {};
  };
  'action/follow': {
    params: {};
  };
  'action/unfollow': {
    params: {};
  };
  'action/save': {
    params: {};
  };
  'action/unsave': {
    params: {};
  };
  'action/bump': {
    params: {};
  };
  'action/unbump': {
    params: {};
  };
  'action/fund': {
    params: {};
  };
  'action.progress-bar/update': {
    params: {};
  };
  'action.tabs/update': {
    params: {
      'tab/id': string;
    };
  };
  'action.create.modal/open': {
    params: {};
  };
  'action.create.modal/close': {
    params: {};
  };
  'action.create.modal/create': {
    params: {};
  };
  'action.create.modal.title/update': {
    params: {
      value: string;
    };
  };
  'navigated.action/view': {
    params: {
      route: Route;
    };
  };
  'navigated.action/new': {
    params: {
      route: Route;
    };
  };
};

export const actionSlice = () => ({
  'action/state': {
    'action.tabs/active-tab': 'home',
    'action.progress-bar/active-switch': 'work',
    'action.create.modal/visible': false,
    'action.create.modal/title': '',
  },
});

sub('action.tabs/active-tab-id', ({ state }) => state['action/state']['action.tabs/active-tab']);

sub(
  'action.progress-bar/active-switch',
  ({ state }) => state['action/state']['action.progress-bar/active-switch']
);

remoteSub('action/title');
remoteSub('action/description');
remoteSub('action/outcome');
remoteSub('action/updated-at');

sub('action.funding/percentage', () => 24);
sub('action/saved', () => false);
sub('action/followed', () => false);
sub('action.bump/count', () => 10);
sub('action.follow/count', () => 2600);
sub('action.work/percentage', () => 23);

sub('current.action/id', ({ state }) => state['action/state']['current.action/id']);

sub('action.create.modal/title', ({ state }) => state['action/state']['action.create.modal/title']);

sub(
  'action.create.modal/visible',
  ({ state }) => state['action/state']['action.create.modal/visible']
);

sub('action.title/can-edit', () => true);

sub('action.description/can-edit', () => true);

sub('action.outcome/can-edit', () => true);

evt('action.title/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'action.title/text' },
  });
});

evt('action.description/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'action.description/text' },
  });
});

evt('action.outcome/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'action.outcome/text' },
  });
});

evt('current.action.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['current.action/id'] = params['action/id'];
  });
});

evt('action/volunteer', () => null);
evt('action/follow', () => null);
evt('action/unfollow', () => null);
evt('action/save', () => null);
evt('action/unsave', () => null);
evt('action/bump', () => null);
evt('action/unbump', () => null);
evt('action/fund', () => null);
evt('action.progress-bar/update', () => null);

evt('action.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.tabs/active-tab'] = params['tab/id'];
  });
});

evt('action.create.modal/open', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/visible'] = true;
  });
});

evt('action.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/visible'] = false;
  });
});

evt('action.create.modal/create', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/title'] = '';
    state['action/state']['action.create.modal/visible'] = false;
  });
});

evt('action.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/title'] = params.value;
  });
});

evt('navigated.action/view', ({ params }) => {
  const id = params.route.params.id;
  dispatch('current.action.id/set', { 'action/id': id });
});

evt('navigated.action/new', async ({ params }) => {
  const { title } = params.route.params;
  const { id } = await rpcPost('action.draft/create', { 'action/title': title });
  navigate({ id: 'action/view', replace: true, params: { id } });
});

registerTextEditor('action.title/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ state: getState(), params });
    await rpcPost('action.title.text/update', {
      'action/id': params['ref/id'],
      value: title,
    });
    await invalidateAsyncSub('action/title', { 'action/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('action.description/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ state: getState(), params });
    await rpcPost('action.description.text/update', {
      'action/id': params['ref/id'],
      value: description,
    });
    await invalidateAsyncSub('action/description', { 'action/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('action.outcome/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const outcome = text({ state: getState(), params });
    await rpcPost('action.outcome.text/update', {
      'action/id': params['ref/id'],
      value: outcome,
    });
    await invalidateAsyncSub('action/outcome', { 'action/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
