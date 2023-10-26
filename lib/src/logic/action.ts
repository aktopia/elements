import {
  dispatch,
  evt,
  invalidateAsyncSub,
  invalidateAsyncSubs,
  remoteSub,
  sub,
} from '@elements/store';
import { rpcPost } from '@elements/rpc';
import {
  endEditing,
  registerTextEditor,
  startEditing,
  text,
  updateText,
} from '@elements/logic/text-editor';
import type { Match } from '@elements/router';
import { navigateToRoute } from '@elements/router';
import { parseClosestLocality, resolveLatLng } from '@elements/utils/location';
import { type LatLng } from '@elements/components/map';
import { wrapRequireAuth } from '@elements/logic/authentication';

export type TabId = 'home' | 'discuss' | 'updates';

export type Subs = {
  'action.tabs/active-tab': {
    params: {};
    result: TabId;
  };
  'action.progress-bar/active-switch': {
    params: {};
    result: string;
  };
  'action.title/text': {
    params: {
      'action/id': string;
    };
    result: string;
  };
  'action.description/text': {
    params: {
      'action/id': string;
    };
    result: string;
  };
  'action.outcome/text': {
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
  'action.locality/exists': {
    params: { 'action/id': string };
    result: boolean;
  };
  'action.locality/name': {
    params: { 'action/id': string };
    result: string;
  };
  'action.locality.slide-over/visible': {
    params: {};
    result: boolean;
  };
  'action.locality/location': {
    params: { 'action/id': string };
    result: LatLng;
  };
  'action.locality/zoom': {
    params: { 'action/id': string };
    result: number;
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
  'action.create.modal.title/update': {
    params: {
      value: string;
    };
  };
  'action.locality.slide-over/open': {
    params: {};
  };
  'action.locality.slide-over/close': {
    params: {};
  };
  'action.locality/choose': {
    params: { location: LatLng; zoom: number };
  };
  'navigated.action/view': {
    params: {
      route: Match;
    };
  };
  'navigated.action/new': {
    params: {
      route: Match;
    };
  };
};

export const actionSlice = () => ({
  'action/state': {
    'action.tabs/active-tab': 'home',
    'action.progress-bar/active-switch': 'work',
    'action.create.modal/visible': false,
    'action.create.modal/title': '',
    'action.locality.slide-over/visible': false,
  },
});

sub('action.tabs/active-tab', ({ state }) => state['action/state']['action.tabs/active-tab']);

sub(
  'action.progress-bar/active-switch',
  ({ state }) => state['action/state']['action.progress-bar/active-switch']
);

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

sub(
  'action.locality.slide-over/visible',
  ({ state }) => state['action/state']['action.locality.slide-over/visible']
);

remoteSub('action.title/text');
remoteSub('action.description/text');
remoteSub('action.outcome/text');
remoteSub('action/updated-at');
remoteSub('action.locality/exists');
remoteSub('action.locality/name');
remoteSub('action.locality/location');
remoteSub('action.locality/zoom');

evt('action.title/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: { ref: ['action.title/text', currenActionId] },
  });
});

evt('action.description/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: {
      ref: ['action.description/text', currenActionId],
    },
  });
});

evt('action.outcome/edit', ({ setState, getState }) => {
  const currenActionId = getState()['action/state']['current.action/id'];

  startEditing({
    setState,
    params: {
      ref: ['action.outcome/text', currenActionId],
    },
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

evt(
  'action.create.modal/open',
  wrapRequireAuth(({ setState }) => {
    setState((state: any) => {
      state['action/state']['action.create.modal/visible'] = true;
    });
  })
);

evt('action.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/visible'] = false;
    state['action/state']['action.create.modal/title'] = '';
  });
});

evt('action.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state['action/state']['action.create.modal/title'] = params.value;
  });
});

evt('navigated.action/view', ({ params }) => {
  const id = params.route.pathParams.id;
  const tab = params.route.hashParams.tab;
  if (tab) {
    dispatch('action.tabs/update', { 'tab/id': tab });
  }
  dispatch('current.action.id/set', { 'action/id': id });
  dispatch('route.navigation/complete');
});

evt('navigated.action/new', async ({ params }) => {
  const { title } = params.route.queryParams;
  const { id } = await rpcPost('action.draft/create', { 'action.title/text': title });
  navigateToRoute('action/view', { pathParams: { id } }, { replace: true });
});

evt('action.locality.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.locality.slide-over/visible'] = true;
  });
});

evt('action.locality.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['action/state']['action.locality.slide-over/visible'] = false;
  });
});

evt('action.locality/choose', async ({ getState, params }) => {
  const currentActionId = getState()['action/state']['current.action/id'];
  const { location, zoom } = params;
  const placeDetails = await resolveLatLng(location);
  const name = parseClosestLocality(placeDetails.addressComponents);

  await rpcPost('action.locality/upsert', {
    'action/id': currentActionId,
    location,
    zoom,
    name,
  });

  await invalidateAsyncSubs([
    ['action.locality/location', { 'action/id': currentActionId }],
    ['action.locality/zoom', { 'action/id': currentActionId }],
    ['action.locality/name', { 'action/id': currentActionId }],
    ['action.locality/exists', { 'action/id': currentActionId }],
  ]);

  dispatch('action.locality.slide-over/close', {});
});

registerTextEditor('action.title/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ state: getState(), params });
    await rpcPost('action.title.text/update', {
      'action/id': params.ref[1],
      value: title,
    });
    await invalidateAsyncSub('action.title/text', { 'action/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('action.description/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ state: getState(), params });
    await rpcPost('action.description.text/update', {
      'action/id': params.ref[1],
      value: description,
    });
    await invalidateAsyncSub('action.description/text', { 'action/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});

registerTextEditor('action.outcome/text', {
  onTextUpdate: updateText,
  onEditDone: async ({ setState, getState, params }) => {
    const outcome = text({ state: getState(), params });
    await rpcPost('action.outcome.text/update', {
      'action/id': params.ref[1],
      value: outcome,
    });
    await invalidateAsyncSub('action.outcome/text', { 'action/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: endEditing,
});
