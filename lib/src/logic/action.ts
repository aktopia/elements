import { dispatch, evt, sub } from '@elements/store';
import { remoteSub } from '@elements/store/register';
import { rpcPost } from '@elements/rpc';
import { navigateTo } from '@elements/utils';

export const actionSlice = () => ({
  actionState: {
    activeTab: 'home',
    activeProgressBarSwitch: 'work',
    'action.create.modal/visible': false,
    'action.create.modal/title': '',
  },
});

sub('action.tabs/active-tab-id', ({ state }) => state.actionState.activeTab);

sub(
  'action.progress-bar/active-switch-id',
  ({ state }) => state.actionState.activeProgressBarSwitch
);

remoteSub<{ 'action/id': string }, string>('action/title');
remoteSub<{ 'action/id': string }, string>('action/description');
remoteSub<{ 'action/id': string }, string>('action/outcome');

sub('action.funding/percentage', ({ state }) => 24);
sub('action/saved', ({ state }) => false);
sub('action/followed', ({ state }) => false);
sub('action.bump/count', ({ state }) => '10');
sub('action.follow/count', ({ state }) => '2600');
sub('action.work/percentage', ({ state }) => '23');
sub('action/last-active-at', ({ state }) => '');
sub('current.action/id', ({ state }) => state.actionState.currentActionId);

sub('action.create.modal/title', ({ state }) => state.actionState['action.create.modal/title']);

sub('action.create.modal/visible', ({ state }) => state.actionState['action.create.modal/visible']);

sub('action.create.modal/new-action-link', ({ state }) => {
  const title = state.actionState['action.create.modal/title'];
  return `/action/${title}`;
});

evt('current.action.id/set', ({ setState, params }) => {
  setState((state: any) => {
    state.actionState.currentActionId = params['action/id'];
  });
});

evt('action/volunteer', ({ setState, params }) => null);
evt('action/follow', ({ setState, params }) => null);
evt('action/unfollow', ({ setState, params }) => null);
evt('action/save', ({ setState, params }) => null);
evt('action/unsave', ({ setState, params }) => null);
evt('action/bump', ({ setState, params }) => null);
evt('action/unbump', ({ setState, params }) => null);
evt('action/fund', ({ setState, params }) => null);
evt('action.progress-bar/update', ({ setState, params }) => null);

evt('action.tabs/update', ({ setState, params }) => {
  setState((state: any) => {
    state.actionState.activeTab = params['tab/id'];
  });
});

evt('action.create.modal/open', ({ setState }) => {
  setState((state: any) => {
    state.actionState['action.create.modal/visible'] = true;
  });
});

evt('action.create.modal/close', ({ setState }) => {
  setState((state: any) => {
    state.actionState['action.create.modal/visible'] = false;
  });
});

evt('action.create.modal/create', ({ setState }) => {
  setState((state: any) => {
    state.actionState['action.create.modal/title'] = '';
    state.actionState['action.create.modal/visible'] = false;
  });
});

evt('action.create.modal.title/update', ({ setState, params }) => {
  setState((state: any) => {
    state.actionState['action.create.modal/title'] = params.value;
  });
});

export const onActionViewNavigate = (route: any) => {
  const id = route.params.id;
  dispatch('current.action.id/set', { 'action/id': id });
};

export const onActionNewNavigate = async (route: any) => {
  const { title } = route.params;
  const { id } = await rpcPost('action.draft/create', { 'action/title': title });
  navigateTo({ to: `/action/${id}`, replace: true });
};
