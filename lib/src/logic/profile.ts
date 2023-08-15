import { dispatch, evt, sub } from '@elements/store';

export const profileSlice = () => ({
  profileState: {
    activeTab: 'actions',
  },
});

sub('profile.user/id', ({ state }) => state.profileState.userId);
sub('profile/actions', ({ state }) => []);
sub('profile/issues', ({ state }) => []);
sub('profile.tabs/active-tab-id', ({ state }) => state.profileState.activeTab);

evt('profile.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state.profileState.activeTab = params['tab/id'];
  });
});

evt('profile.user.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state.profileState.userId = params.id;
  });
});

export const onProfileViewNavigate = ({ params }) => {
  const { id } = params;
  dispatch('profile.user.id/set', { id });
};
