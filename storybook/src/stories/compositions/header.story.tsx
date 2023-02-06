import { Header as Component } from '@elements/compositions/header';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Header',
  component: Component,
};

// TODO Better story to test router

export const store = {
  read: {
    'session/exists': false,
    'current.user/name': '',
  },
  dispatch: ['auth.sign-in/initiate'],
};

export const Header = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
