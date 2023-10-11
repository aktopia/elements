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
import type { Match } from '@elements/router';
import { navigateToRoute } from '@elements/router';
import type { LatLng, LatLngBounds } from '@elements/components/map';
import { parseClosestLocality, resolveLatLng } from '@elements/utils/location';
import { wrapRequireAuth } from '@elements/logic/authentication';

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
  'issue.severity/score': {
    params: { 'issue/id': string };
    result: number;
  };
  'issue.severity.score/votes': {
    params: { 'issue/id': string };
    result: number;
  };
  'issue.current.user.severity/score': {
    params: { 'issue/id': string };
    result: number;
  };
  'issue.locality/exists': {
    params: { 'issue/id': string };
    result: boolean;
  };
  'issue.locality/name': {
    params: { 'issue/id': string };
    result: string;
  };
  'issue.locality.slide-over/visible': {
    params: {};
    result: boolean;
  };
  'issue.locality/location': {
    params: { 'issue/id': string };
    result: LatLng;
  };
  'issue.locality/zoom': {
    params: { 'issue/id': string };
    result: number;
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
    params: {
      location: LatLng;
      bounds?: LatLngBounds;
      caption: string;
    };
  };
  'issue.location/delete': {
    params: {
      'location/id': string;
    };
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
  'issue.create.modal.title/update': {
    params: {
      value: string;
    };
  };
  'issue.current.user.severity/vote': {
    params: {
      score: number;
    };
  };
  'issue.locality.slide-over/open': {
    params: {};
  };
  'issue.locality.slide-over/close': {
    params: {};
  };
  'issue.locality/choose': {
    params: { location: LatLng; zoom: number };
  };
  'navigated.issue/view': {
    params: {
      route: Match;
    };
  };
  'navigated.issue/new': {
    params: {
      route: Match;
    };
  };
};

export const issueSlice = () => ({
  'issue/state': {
    'issue.tabs/active-tab': 'home',
    'issue.create.modal/visible': false,
    'issue.create.modal/title': '',
    'issue.location.slide-over/visible': false,
    'issue.locality.slide-over/visible': false,
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

sub('issue.title/can-edit', () => true);

sub('issue.description/can-edit', () => true);

sub('issue.resolution/can-edit', () => true);

sub(
  'issue.location.slide-over/visible',
  ({ state }) => state['issue/state']['issue.location.slide-over/visible']
);

sub(
  'issue.locality.slide-over/visible',
  ({ state }) => state['issue/state']['issue.locality.slide-over/visible']
);

remoteSub('issue.users.facing/count');
remoteSub('issue.current.user/facing');
remoteSub('issue.title/text');
remoteSub('issue/updated-at');
remoteSub('issue.resolution/text');
remoteSub('issue.description/text');
remoteSub('issue/locations');
remoteSub('issue.location.default/center');
remoteSub('issue.location.default/zoom');
remoteSub('issue.severity/score');
remoteSub('issue.severity.score/votes');
remoteSub('issue.current.user.severity/score');
remoteSub('issue.locality/exists');
remoteSub('issue.locality/name');
remoteSub('issue.locality/location');
remoteSub('issue.locality/zoom');

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

evt('issue.location/add', async ({ getState, params }) => {
  const { 'current.issue/id': currentIssueId } = getState()['issue/state'];
  const { location, bounds, caption } = params;

  await rpcPost('issue.location/add', { 'issue/id': currentIssueId, location, bounds, caption });
  await invalidateAsyncSub('issue/locations', { 'issue/id': currentIssueId });
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

evt(
  'issue.create.modal/open',
  wrapRequireAuth(({ setState }) => {
    setState((state: any) => {
      state['issue/state']['issue.create.modal/visible'] = true;
    });
  })
);

evt('issue.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.create.modal/visible'] = false;
    state['issue/state']['issue.create.modal/title'] = '';
  });
});

evt('issue.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state['issue/state']['issue.create.modal/title'] = params.value;
  });
});

evt('navigated.issue/view', ({ params }) => {
  const id = params.route.pathParams.id;
  const tab = params.route.hashParams.tab;
  if (tab) {
    dispatch('issue.tabs/update', { 'tab/id': tab });
  }
  dispatch('current.issue.id/set', { 'issue/id': id });
  dispatch('route.navigation/complete');
});

evt('navigated.issue/new', async ({ params }) => {
  const { title } = params.route.queryParams;
  const { id } = await rpcPost('issue.draft/create', { 'issue.title/text': title });
  navigateToRoute('issue/view', { pathParams: { id } }, { replace: true });
});

evt('issue.current.user.severity/vote', async ({ getState, params }) => {
  const currentIssueId = getState()['issue/state']['current.issue/id'];
  await rpcPost('issue.current.user.severity/vote', {
    'issue/id': currentIssueId,
    score: params.score,
  });
  await invalidateAsyncSubs([
    ['issue.severity/score', { 'issue/id': currentIssueId }],
    ['issue.current.user.severity/score', { 'issue/id': currentIssueId }],
    ['issue.severity.score/votes', { 'issue/id': currentIssueId }],
  ]);
});

evt('issue.locality.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.locality.slide-over/visible'] = true;
  });
});

evt('issue.locality.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['issue/state']['issue.locality.slide-over/visible'] = false;
  });
});

evt('issue.locality/choose', async ({ getState, params }) => {
  const currentIssueId = getState()['issue/state']['current.issue/id'];
  const { location, zoom } = params;
  const placeDetails = await resolveLatLng(location);
  const name = parseClosestLocality(placeDetails.addressComponents);

  await rpcPost('issue.locality/upsert', {
    'issue/id': currentIssueId,
    location,
    zoom,
    name,
  });

  await invalidateAsyncSubs([
    ['issue.locality/location', { 'issue/id': currentIssueId }],
    ['issue.locality/zoom', { 'issue/id': currentIssueId }],
    ['issue.locality/name', { 'issue/id': currentIssueId }],
    ['issue.locality/exists', { 'issue/id': currentIssueId }],
  ]);

  dispatch('issue.locality.slide-over/close', {});
});

evt('issue.location/delete', async ({ getState, params }) => {
  const currentIssueId = getState()['issue/state']['current.issue/id'];
  await rpcPost('location/delete', { 'location/id': params['location/id'] });
  await invalidateAsyncSub('issue/locations', { 'issue/id': currentIssueId });
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
