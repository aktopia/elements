import { wrapPage } from '@elements/compositions/wrap-page';
import { store as signInStore } from '@story/stories/compositions/auth/sign-in.story';
import { store as headerStore } from '@story/stories/compositions/header.story';
import { mockStory } from '@story/utils/mock-story';

const Component = wrapPage(() => {
  return <div>{'Test'}</div>;
});
export default {
  title: 'WrapPage',
  component: Component,
};

const store = {
  read: {
    ...signInStore.read,
    ...headerStore.read,
    'auth.sign-in/visible': false,
  },
  dispatch: [],
};

export const WrapPage = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
