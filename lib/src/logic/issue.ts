import { dispatch, evt, invalidateAsyncSub, remoteSub, sub } from '@elements/store';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';
import type { Route } from '@elements/logic/router';
import { navigate } from '@elements/logic/router';

type TabId = 'home' | 'discuss' | 'media' | 'locations';

export type Subs = {
  'current.issue/id': {
    params: {};
    result: string;
  };
  'issue/saved': {
    params: {};
    result: boolean;
  };
  'issue/followed': {
    params: {};
    result: boolean;
  };
  'issue.follow/count': {
    params: {};
    result: number;
  };
  'issue.title/text': {
    params: {};
    result: string;
  };
  'issue.tabs/active-tab': {
    params: {};
    result: TabId;
  };
  'issue/updated-at': {
    params: {};
    result: number;
  };
  'issue.resolution/text': {
    params: {};
    result: string;
  };
  'issue.description/text': {
    params: {};
    result: string;
  };
  'location/data': {
    params: {};
    result: any[]; // This is an array but without further context, it's marked as any[].
  };
  'issue.location/center': {
    params: {};
    result: {}; // This is an object, but exact type details are unknown.
  };
  'issue.location.slide-over/visible': {
    params: {};
    result: boolean;
  };
  'issue.create.modal/title': {
    params: {};
    result: string;
  };
  'issue.create.modal/visible': {
    params: {};
    result: boolean;
  };
  'issue.title/can-edit': {
    params: {};
    result: boolean;
  };
  'issue.description/can-edit': {
    params: {};
    result: boolean;
  };
  'issue.resolution/can-edit': {
    params: {};
    result: boolean;
  };
};

export type Events = {
  'issue.title/edit': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'issue.description/edit': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'issue.resolution/edit': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
  };
  'issue/follow': {
    params: {};
  };
  'issue/unfollow': {
    params: {};
  };
  'issue/save': {
    params: {};
  };
  'issue/unsave': {
    params: {};
  };
  'issue.severity/reset': {
    params: {};
  };
  'issue.tabs/update': {
    params: {
      'tab/id': string;
    };
  };
  'issue.location.slide-over/open': {
    params: {};
  };
  'issue.location.slide-over/close': {
    params: {};
  };
  'issue.location/add': {
    params: {};
  };
  'issue.location.center/update': {
    params: {};
  };
  'issue.location.caption/update': {
    params: {};
  };
  'current.issue.id/set': {
    params: {
      'issue/id': string;
    };
  };
  'issue.create.modal/open': {
    params: {};
  };
  'issue.create.modal/close': {
    params: {};
  };
  'issue.create.modal/create': {
    params: {};
  };
  'issue.create.modal.title/update': {
    params: {
      value: string;
    };
  };
  'navigated.issue/view': {
    params: {
      route: Route;
    };
  };
  'navigated.issue/new': {
    params: {
      route: Route;
    };
  };
};

export const issueSlice = () => ({
  'issue/state': {
    'issue.tabs/active-tab': 'home',
    'issue.create.modal/visible': false,
    'issue.create.modal/title': '',
  },
});

sub('current.issue/id', ({ state }) => state['issue/state']['current.issue/id']);

sub('issue.tabs/active-tab', ({ state }) => state['issue/state']['issue.tabs/active-tab']);

sub('issue.create.modal/title', ({ state }) => state['issue/state']['issue.create.modal/title']);

sub(
  'issue.create.modal/visible',
  ({ state }) => state['issue/state']['issue.create.modal/visible']
);

sub('issue/saved', () => false);
sub('issue/followed', () => false);
sub('issue.follow/count', () => 2600);

remoteSub('issue.title/text');
remoteSub('issue/updated-at');
remoteSub('issue.resolution/text');
remoteSub('issue.description/text');

sub('issue.title/can-edit', () => true);

sub('issue.description/can-edit', () => true);

sub('issue.resolution/can-edit', () => true);

sub('location/data', () => []);
sub('issue.location/center', () => ({}));
sub('issue.location.slide-over/visible', () => false);

evt('issue/follow', () => null);
evt('issue/unfollow', () => null);
evt('issue/save', () => null);
evt('issue/unsave', () => null);
evt('issue.severity/reset', () => null);
evt('issue.location.slide-over/open', () => null);
evt('issue.location.slide-over/close', () => null);
evt('issue.location/add', () => null);
evt('issue.location.center/update', () => null);
evt('issue.location.caption/update', () => null);

evt('issue.title/edit', ({ setState, getState }) => {
  const currenActionId = getState()['issue/state']['current.issue/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'issue.title/text' },
  });
});

evt('issue.description/edit', ({ setState, getState }) => {
  const currenActionId = getState()['issue/state']['current.issue/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'issue.description/text' },
  });
});

evt('issue.resolution/edit', ({ setState, getState }) => {
  const currenActionId = getState()['issue/state']['current.issue/id'];

  startEditing({
    setState,
    params: { 'ref/id': currenActionId, 'ref/attribute': 'issue.resolution/text' },
  });
});

evt('issue.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state['issue/state']['issue.tabs/active-tab'] = params['tab/id'];
  });
});

evt('current.issue.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['issue/state']['current.issue/id'] = params['issue/id'];
  });
});

evt('issue.create.modal/open', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.create.modal/visible'] = true;
  });
});

evt('issue.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.create.modal/visible'] = false;
  });
});

evt('issue.create.modal/create', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.create.modal/title'] = '';
    state['issue/state']['issue.create.modal/visible'] = false;
  });
});

evt('issue.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state['issue/state']['issue.create.modal/title'] = params.value;
  });
});

evt('navigated.issue/view', ({ params }) => {
  const id = params.route.params.id;
  dispatch('current.issue.id/set', { 'issue/id': id });
});

evt('navigated.issue/new', async ({ params }) => {
  const { title } = params.route.params;
  const { id } = await rpcPost('issue.draft/create', { 'issue.title/text': title });
  navigate({ id: 'issue/view', replace: true, params: { id } });
});

registerTextEditor('issue.title/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ state: getState(), params });
    await rpcPost('issue.title.text/update', {
      'issue/id': params['ref/id'],
      value: title,
    });
    await invalidateAsyncSub('issue.title/text', { 'issue/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('issue.description/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ state: getState(), params });
    await rpcPost('issue.description.text/update', {
      'issue/id': params['ref/id'],
      value: description,
    });
    await invalidateAsyncSub('issue.description/text', { 'issue/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('issue.resolution/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const resolution = text({ state: getState(), params });
    await rpcPost('issue.resolution.text/update', {
      'issue/id': params['ref/id'],
      value: resolution,
    });
    await invalidateAsyncSub('issue.resolution/text', { 'issue/id': params['ref/id'] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
