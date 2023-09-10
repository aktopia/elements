import { UserRegistration as Component } from '@elements/compositions/auth/user-registration';
import { mockStory } from '@story/utils/mock-story';
import { store } from '@story/stores/auth/user-registration';

export default {
  title: 'Compositions/Auth/Registration',
  component: Component,
};

export const UserRegistration = mockStory({
  store,
  args: { suspenseLines: 10 },
  render: () => {
    return <Component />;
  },
});
