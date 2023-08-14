import { evt, sub } from '@elements/store';

export const actionSlice = () => ({
  'action/state': {
    'action.tabs/active-tab-id': 'home',
    'action.progress-bar/active-switch-id': 'work',
  },
});

sub('action.progress-bar/switches', (state) => [
  { id: 'work', label: 'Work' },
  { id: 'funding', label: 'Funding' },
]);

sub('action/title', (state) => 'Clear large garbage dump on Vandipalayam road');
sub('action.funding/percentage', (state) => 24);
sub('action/saved', (state) => false);
sub('action/followed', (state) => false);
sub('action/last-active', (state) => 'ADD-ME');
sub('action.bump/count', (state) => '10');
sub('action.follow/count', (state) => '2600');
sub('action.tabs/active-tab-id', (state) => state['action/state']['action.tabs/active-tab-id']);
sub('action.progress-bar/active-switch-id', (state) => 'work');
sub('action.work/percentage', (state) => '23');
sub('action/last-active-at', (state) => '');

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

sub('current.action/id', (_state) => '1');

evt('action/volunteer', (_setState, _params) => null);
evt('action/follow', (_setState, _params) => null);
evt('action/unfollow', (_setState, _params) => null);
evt('action/save', (_setState, _params) => null);
evt('action/unsave', (_setState, _params) => null);
evt('action/bump', (_setState, _params) => null);
evt('action/unbump', (_setState, _params) => null);
evt('action/fund', (_setState, _params) => null);
evt('action.progress-bar/update', (_setState, _params) => null);

evt('action.tabs/update', (setState, params) => {
  setState((state: any) => {
    state['action/state']['action.tabs/active-tab-id'] = params['tab/id'];
  });
});
