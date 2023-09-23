import { dispatch, evt, remoteSub, sub } from '@elements/store';
import type { Match } from '@elements/router';

export type TabId = 'actions' | 'issues';

export const profileSlice = () => ({
  'profile/state': {
    'profile.tabs/active-tab': 'actions',
  },
});

export type Subs = {
  'profile.user/id': {
    params: {};
    result: string;
  };
  'profile.action/ids': {
    params: {
      'user/id': string;
    };
    result: string[];
  };
  'profile.issue/ids': {
    params: {
      'user/id': string;
    };
    result: string[];
  };
  'profile.tabs/active-tab': {
    params: {};
    result: TabId;
  };
};

export type Events = {
  'profile.tabs/update': {
    params: {
      'tab/id': TabId;
    };
  };
  'profile.user.id/set': {
    params: {
      id: string;
    };
  };
  'navigated.profile/view': {
    params: {
      route: Match;
    };
  };
};

sub('profile.user/id', ({ state }) => state['profile/state']['profile.user/id']);
sub('profile.tabs/active-tab', ({ state }) => state['profile/state']['profile.tabs/active-tab']);

remoteSub('profile.action/ids');
remoteSub('profile.issue/ids');

evt('profile.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state['profile/state']['profile.tabs/active-tab'] = params['tab/id'];
  });
});

evt('profile.user.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state['profile/state']['profile.user/id'] = params.id;
  });
});

evt('navigated.profile/view', ({ params }) => {
  const { id, tab } = params.route.pathParams;
  dispatch('profile.user.id/set', { id });
  dispatch('profile.tabs/update', { 'tab/id': tab });
});
