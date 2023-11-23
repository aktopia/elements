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
  onEditCancelDefault,
  onTextUpdateDefault,
  registerTextEditor,
  setError,
  startEditing,
  text,
} from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';
import type { Match } from '@elements/router';
import { navigateToRoute } from '@elements/router';
import type { LatLng, LatLngBounds } from '@elements/components/map';
import { parseClosestLocality, resolveLatLng } from '@elements/utils/location';
import { wrapRequireAuth } from '@elements/logic/authentication';
import type { Evt, Sub } from '@elements/store/types';
import { guid } from '@elements/utils';
import type { Image } from '@elements/components/media-gallery';

export type TabId = 'issue.tab/home' | 'issue.tab/discuss' | 'issue.tab/media' | 'issue.tab/spots';

export interface Location extends LatLng {
  id: string;
  caption: string;
}

export type Subs = {
  'current.issue/id': Sub<{}, string>;
  'issue/saved': Sub<{}, boolean>;
  'issue/followed': Sub<{}, boolean>;
  'issue.follow/count': Sub<{}, number>;
  'issue.title/text': Sub<{ 'issue/id': string }, string>;
  'issue.tabs/active-tab': Sub<{}, TabId>;
  'issue/updated-at': Sub<{ 'issue/id': string }, number>;
  'issue.resolution/text': Sub<{ 'issue/id': string }, string>;
  'issue.description/text': Sub<{ 'issue/id': string }, string>;
  'issue.location.default/center': Sub<{ 'issue/id': string }, LatLng>;
  'issue.location.default/zoom': Sub<{ 'issue/id': string }, number>;
  'issue.location.slide-over/visible': Sub<{}, boolean>;
  'issue.create.modal/title': Sub<{}, string>;
  'issue.create.modal/visible': Sub<{}, boolean>;
  'issue.title/can-edit': Sub<{}, boolean>;
  'issue.description/can-edit': Sub<{}, boolean>;
  'issue.resolution/can-edit': Sub<{}, boolean>;
  'issue.users.facing/count': Sub<{ 'issue/id': string }, number>;
  'issue.current.user/facing': Sub<{ 'issue/id': string }, boolean>;
  'issue/locations': Sub<{ 'issue/id': string }, Location[]>;
  'issue.severity/score': Sub<{ 'issue/id': string }, number>;
  'issue.severity.score/votes': Sub<{ 'issue/id': string }, number>;
  'issue.current.user.severity/score': Sub<{ 'issue/id': string }, number>;
  'issue.locality/exists': Sub<{ 'issue/id': string }, boolean>;
  'issue.locality/name': Sub<{ 'issue/id': string }, string>;
  'issue.locality.slide-over/visible': Sub<{}, boolean>;
  'issue.locality/location': Sub<{ 'issue/id': string }, LatLng>;
  'issue.locality/zoom': Sub<{ 'issue/id': string }, number>;
  'issue/images': Sub<{ 'issue/id': string }, Image[]>;
};

export type Events = {
  'issue.title/edit': Evt<{ 'ref/id': string; 'ref/attribute': string }>;
  'issue.description/edit': Evt<{ 'ref/id': string; 'ref/attribute': string }>;
  'issue.resolution/edit': Evt<{ 'ref/id': string; 'ref/attribute': string }>;
  'issue/follow': Evt<{}>;
  'issue/unfollow': Evt<{}>;
  'issue/save': Evt<{}>;
  'issue/unsave': Evt<{}>;
  'issue.severity/reset': Evt<{}>;
  'issue.tabs/update': Evt<{ 'tab/id': string }>;
  'issue.location.slide-over/open': Evt<{}>;
  'issue.location.slide-over/close': Evt<{}>;
  'issue.location/add': Evt<{ location: LatLng; bounds?: LatLngBounds; caption: string }>;
  'issue.location/delete': Evt<{ 'location/id': string }>;
  'current.issue.id/set': Evt<{ 'issue/id': string }>;
  'issue.current.user/face': Evt<{}>;
  'issue.create.modal/open': Evt<{}>;
  'issue.create.modal/close': Evt<{}>;
  'issue.create.modal.title/update': Evt<{ value: string }>;
  'issue.current.user.severity/vote': Evt<{ score: number }>;
  'issue.locality.slide-over/open': Evt<{}>;
  'issue.locality.slide-over/close': Evt<{}>;
  'issue.locality/choose': Evt<{ location: LatLng; zoom: number }>;
  'navigated.issue/view': Evt<{ route: Match }>;
  'navigated.issue/new': Evt<{ route: Match }>;
  'issue.image/add': Evt<{ file: File; 'issue/id': string; caption: string }>;
  'issue.image/delete': Evt<{ 'image/id': string; 'issue/id': string }>;
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
remoteSub('issue.title/can-edit');
remoteSub('issue.description/can-edit');
remoteSub('issue.resolution/can-edit');
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
remoteSub('issue/images');

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
    params: { ref: ['issue.title/text', currenActionId] },
  });
});

evt('issue.description/edit', ({ setState, getState }) => {
  const currenActionId = getState()['issue/state']['current.issue/id'];

  startEditing({
    setState,
    params: { ref: ['issue.description/text', currenActionId] },
  });
});

evt('issue.resolution/edit', ({ setState, getState }) => {
  const currenActionId = getState()['issue/state']['current.issue/id'];

  startEditing({
    setState,
    params: { ref: ['issue.resolution/text', currenActionId] },
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

const getPresignedUrlS3 = async ({
  objectKey,
}: {
  objectKey: string;
  metadata: Record<string, string>;
}) => {
  const url = '/api/lambda/s3/presign-url';

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ 'object-key': objectKey }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();

  return json.data;
};

const uploadToS3 = async (presignedUrl: string, file: File) => {
  return await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
};

evt('issue.image/add', async ({ params }) => {
  // TODO Add metadata like type, timestamp, etc.
  // TODO Think if extension to objectKey is required.
  try {
    const metadata = {};
    const id = guid();
    const presignedUrl = await getPresignedUrlS3({ objectKey: id, metadata });
    const res = await uploadToS3(presignedUrl, params.file);

    if (res.status !== 200) {
      return console.error('error uploading to s3.');
    }

    await rpcPost('issue.image/add', {
      'issue/id': params['issue/id'],
      'image/id': id,
      'image/caption': params['caption'],
    });

    await invalidateAsyncSub('issue/images', { 'issue/id': params['issue/id'] });
  } catch (e) {
    // TODO Handle error properly
    console.error(e);
  }
});

evt('issue.image/delete', async ({ params }) => {
  await rpcPost('issue.image/delete', {
    'issue/id': params['issue/id'],
    'image/id': params['image/id'],
  });

  await invalidateAsyncSub('issue/images', { 'issue/id': params['issue/id'] });
});

registerTextEditor('issue.title/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const title = text({ getState, params })?.trim();
    // TODO Think about abstracting validations than having them in the logic layer.
    if (title === '') {
      return setError({ setState, params: { ...params, error: 'Title cannot be empty.' } });
    }

    await rpcPost('issue.title.text/update', {
      'issue/id': params.ref[1],
      value: title,
    });
    await invalidateAsyncSub('issue.title/text', { 'issue/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});

registerTextEditor('issue.description/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const description = text({ getState, params });
    await rpcPost('issue.description.text/update', {
      'issue/id': params.ref[1],
      value: description,
    });
    await invalidateAsyncSub('issue.description/text', { 'issue/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});

registerTextEditor('issue.resolution/text', {
  onTextUpdate: onTextUpdateDefault,
  onEditDone: async ({ setState, getState, params }) => {
    const resolution = text({ getState, params });
    await rpcPost('issue.resolution.text/update', {
      'issue/id': params.ref[1],
      value: resolution,
    });
    await invalidateAsyncSub('issue.resolution/text', { 'issue/id': params.ref[1] });
    endEditing({ setState, getState, params });
  },
  onEditCancel: onEditCancelDefault,
});
