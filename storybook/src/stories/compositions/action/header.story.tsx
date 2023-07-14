import { Header as Component } from '@elements/compositions/action/header';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/Header',
  component: Component,
};

const store = {
  read: {
    'current.action/id': '1',
    'current.user/id': '2',
    'action.follow/count': 2600,
    'action/saved': false,
    'action/followed': false,
    'action/title': 'Clear large garbage dump on Vandipalayam road',
    'action/last-active': 'ADD-ME',
    'action/bumped': false,
    'action.bump/count': 10,
    'action.progress-bar/active-switch-id': 'work',
    'action.work/percentage': 23,
    'action.funding/percentage': 24,
    'action.progress-bar/switches': [
      { id: 'work', label: 'Work' },
      { id: 'funding', label: 'Funding' },
    ],
    'action/tabs': [
      { id: 'home', label: 'Home' },
      { id: 'funding', label: 'Funding' },
      { id: 'updates', label: 'Updates' },
      { id: 'discuss', label: 'Discuss' },
      { id: 'team', label: 'Team' },
    ],
    'action.tabs/active-tab-id': 'home',
  },
  dispatch: [
    'action/follow',
    'action/unfollow',
    'action/save',
    'action/unsave',
    'action/bump',
    'action/unbump',
    'action/fund',
    'action.progress-bar/update',
    'action.tabs/update',
  ],
};

export const Header = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});