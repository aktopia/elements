import { dispatch, evt, remoteSub, sub } from '@elements/store';
import type { Match } from '@elements/utils/router';
import type { Evt, Sub } from '@elements/store/types';

export type TabId = 'actions' | 'issues';

export type Subs = {
  'profile.user/id': Sub<{}, string>;
  'profile.action/ids': Sub<{ 'user/id': string }, string[]>;
  'profile.issue/ids': Sub<{ 'user/id': string }, string[]>;
  'profile.tabs/active-tab': Sub<{}, TabId>;
};

export type Events = {
  'profile.tabs/update': Evt<{ 'tab/id': TabId }>;
  'profile.user.id/set': Evt<{ id: string }>;
  'navigated.profile/view': Evt<{ route: Match }>;
};

export const profileSlice = () => ({
  'profile/state': {
    'profile.tabs/active-tab': 'actions',
  },
});

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
  const { id } = params.route.pathParams;
  const tab = params.route.hashParams.tab;

  if (tab) {
    dispatch('profile.tabs/update', { 'tab/id': tab as TabId });
  }

  dispatch('profile.user.id/set', { id });
  dispatch('route.navigation/complete');
});
