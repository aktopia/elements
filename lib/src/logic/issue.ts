import { dispatch, evt, invalidateAsyncSub, sub } from '@elements/store';
import { endEditing, registerTextEditor, text, updateText } from '@elements/logic/text-editor';
import { rpcPost } from '@elements/rpc';
import { navigate, Route } from '@elements/logic/router';

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
    result: string;
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
};

export type Events = {
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
  },
});

sub('current.issue/id', ({ state }) => state['issue/state']['current.issue/id']);
sub('issue.tabs/active-tab', ({ state }) => state['issue/state']['issue.tabs/active-tab']);

sub('issue/saved', () => false);
sub('issue/followed', () => false);
sub('issue.follow/count', () => 2600);
sub('issue.title/text', () => 'Nostrud adipisicing id laboris.');
sub('issue/updated-at', () => 1212185440124);
sub('issue.resolution/text', () => 'what');
sub('issue.description/text', () => 'arst');
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
