import { Profile as Component } from '@elements/compositions/profile/profile';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { store as actionStatusStore } from '@story/stores/action/status';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Profile/Profile',
  component: Component,
};

const store = {
  sub: {
    ...wrapPageStore.sub,
    ...actionStatusStore.sub,
    'action.status/modal': { visible: false },
    'profile.user/id': '2',
    'user/name': 'Sunil KS',
    'profile.action/ids': ['1', '2', '3'],
    'profile.issue/ids': ['1', '2', '3'],
    'action.title/text': lorem.generateSentences(1),
    'issue.title/text': lorem.generateSentences(1),
    'profile.tabs/active-tab': 'actions',
  },
  evt: [
    ...wrapPageStore.evt,
    ...actionStatusStore.evt,
    'auth.sign-in/initiate',
    'profile.tabs/update',
  ],
};

const args = {
  suspense: { lines: 5 },
};

export const Profile = mockStory({
  store,
  args,
  parameters: { layout: 'fullscreen' },
  render: (args) => {
    return <Component {...args} />;
  },
});
