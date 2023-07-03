import { Profile as Component } from '@elements/compositions/profile/profile';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Profile/Profile',
  component: Component,
};

const store = {
  read: {
    'profile.user/id': '2',
    'user/name': 'Sunil KS',
    'profile/actions': ['1', '2', '3'],
    'action/title': (_params: any) => lorem.generateSentences(1),
  },
  dispatch: ['navigate.profile/actions', 'navigate.create/action', 'auth.sign-in/initiate'],
};

const args = {
  suspense: { lines: 5 },
};
export const Profile = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
