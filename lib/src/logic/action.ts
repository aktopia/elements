import { evt, sub } from '@elements/store';

export const actionSlice = () => ({
  actionState: {
    activeTab: 'home',
    activeProgressBarSwitch: 'work',
  },
});

sub('action.tabs/active-tab-id', ({ state }) => state.actionState.activeTab);
sub(
  'action.progress-bar/active-switch-id',
  ({ state }) => state.actionState.activeProgressBarSwitch
);

sub('action/title', ({ state }) => 'Clear large garbage dump on Vandipalayam road');
sub('action.funding/percentage', ({ state }) => 24);
sub('action/saved', ({ state }) => false);
sub('action/followed', ({ state }) => false);
sub('action.bump/count', ({ state }) => '10');
sub('action.follow/count', ({ state }) => '2600');
sub('action.work/percentage', ({ state }) => '23');
sub('action/last-active-at', ({ state }) => '');

sub(
  'action/outcome',
  (_state) =>
    'Adipisicing proident esse est ad laboris. Nulla cupidatat commodo ea consequat. Exercitation cupidatat tempor cillum anim sunt tempor laboris ex est anim eu. Duis excepteur do irure sint laborum et commodo veniam ullamco veniam. Ipsum labore magna id commodo exercitation cupidatat deserunt officia.'
);

sub(
  'action/description',
  (_state) =>
    'Mollit minim enim irure eu. Nostrud laboris proident aliqua aliqua officia exercitation sunt magna amet voluptate dolore commodo proident velit excepteur. Proident aute esse pariatur ad labore voluptate in exercitation. Ex cillum magna eu Lorem fugiat ut quis eiusmod veniam consectetur ad tempor anim. Deserunt sint velit anim esse est ullamco magna labore laboris ullamco laborum sunt aliqua ea reprehenderit. Culpa sit irure voluptate elit occaecat.'
);

sub('current.action/id', ({ state }) => '1');

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
