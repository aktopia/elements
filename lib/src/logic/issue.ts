import {
  dispatch,
  evt,
  invalidateAsyncSub,
  invalidateAsyncSubs,
  remoteSub,
  sub,
} from '@elements/store';
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
import { LatLng } from '@elements/components/map/map';

type TabId = 'home' | 'discuss' | 'media' | 'locations';

export interface Location extends LatLng {
  id: string;
  caption: string;
}

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
    params: { 'issue/id': string };
    result: string;
  };
  'issue.tabs/active-tab': {
    params: {};
    result: TabId;
  };
  'issue/updated-at': {
    params: { 'issue/id': string };
    result: number;
  };
  'issue.resolution/text': {
    params: { 'issue/id': string };
    result: string;
  };
  'issue.description/text': {
    params: { 'issue/id': string };
    result: string;
  };
  'issue.location.default/center': {
    params: { 'issue/id': string };
    result: LatLng;
  };
  'issue.location.default/zoom': {
    params: { 'issue/id': string };
    result: number;
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
  'issue.users.facing/count': {
    params: { 'issue/id': string };
    result: number;
  };
  'issue.current.user/facing': {
    params: { 'issue/id': string };
    result: boolean;
  };
  'issue/locations': {
    params: { 'issue/id': string };
    result: Location[];
  };
  'issue.new.location/caption': {
    params: {};
    result: string;
  };
  'issue.severity/score': {
    params: { 'issue/id': string };
    result: number;
  };
  'issue.current.user.severity/voted': {
    params: { 'issue/id': string };
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
  'issue.new.location.center/update': {
    params: { center: LatLng };
  };
  'issue.new.location.caption/update': {
    params: { caption: string };
  };
  'current.issue.id/set': {
    params: {
      'issue/id': string;
    };
  };
  'issue.current.user/face': {
    params: {};
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
  'issue.current.user.severity/vote': {
    params: {};
  };
  'issue.severity.vote/initiate': {
    params: {};
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
    'issue.location.slide-over/visible': false,
  },
});

sub('current.issue/id', ({ state }) => state['issue/state']['current.issue/id']);

sub('issue.tabs/active-tab', ({ state }) => state['issue/state']['issue.tabs/active-tab']);

sub('issue.create.modal/title', ({ state }) => state['issue/state']['issue.create.modal/title']);

sub(
  'issue.create.modal/visible',
  ({ state }) => state['issue/state']['issue.create.modal/visible']
);

sub(
  'issue.new.location/caption',
  ({ state }) => state['issue/state']['issue.new.location/caption']
);

sub('issue/saved', () => false);
sub('issue/followed', () => false);
sub('issue.follow/count', () => 2600);

remoteSub('issue.users.facing/count');
remoteSub('issue.current.user/facing');
remoteSub('issue.title/text');
remoteSub('issue/updated-at');
remoteSub('issue.resolution/text');
remoteSub('issue.description/text');

remoteSub('issue/locations');
remoteSub('issue.location.default/center');
remoteSub('issue.location.default/zoom');

sub('issue.title/can-edit', () => true);

sub('issue.description/can-edit', () => true);

sub('issue.resolution/can-edit', () => true);

sub(
  'issue.location.slide-over/visible',
  ({ state }) => state['issue/state']['issue.location.slide-over/visible']
);

sub('issue.severity/score', () => 6.4);

sub('issue.current.user.severity/voted', () => true);

evt('issue/follow', () => null);
evt('issue/unfollow', () => null);
evt('issue/save', () => null);
evt('issue/unsave', () => null);
evt('issue.severity/reset', () => null);

evt('issue.location.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.location.slide-over/visible'] = true;
  });
});

evt('issue.location.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.location.slide-over/visible'] = false;
  });
});

evt('issue.location/add', async ({ getState }) => {
  const {
    'current.issue/id': currentIssueId,
    'issue.new.location/center': latLng,
    'issue.new.location/caption': caption,
  } = getState()['issue/state'];

  await rpcPost('issue.location/add', { 'issue/id': currentIssueId, ...latLng, caption });
  await invalidateAsyncSub('issue/locations', { 'issue/id': currentIssueId });
});

evt('issue.new.location.center/update', ({ setState, params }) => {
  setState((state: any) => {
    state['issue/state']['issue.new.location/center'] = params.center;
  });
});

evt('issue.new.location.caption/update', ({ setState, params }) => {
  setState((state: any) => {
    state['issue/state']['issue.new.location/caption'] = params.caption;
  });
});

evt('issue.current.user/face', async ({ getState }) => {
  const currentIssueId = getState()['issue/state']['current.issue/id'];
  await rpcPost('issue.current.user/face', { 'issue/id': currentIssueId });

  await invalidateAsyncSubs([
    ['issue.current.user/facing', { 'issue/id': currentIssueId }],
    ['issue.users.facing/count', { 'issue/id': currentIssueId }],
  ]);
});

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

evt('issue.severity.vote/initiate', async ({ getState }) => {});

evt('issue.current.user.severity/vote', async ({ getState }) => {
  const currentIssueId = getState()['issue/state']['current.issue/id'];
  await rpcPost('issue.current.user.severity/vote', { 'issue/id': currentIssueId });
  await invalidateAsyncSubs([
    ['issue.severity/score', { 'issue/id': currentIssueId }],
    ['issue.current.user.severity/voted', { 'issue/id': currentIssueId }],
  ]);
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
