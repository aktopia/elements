import { wrapPage } from '@elements/compositions/wrap-page';
import { store as headerStore } from '@story/stores/header';
import { store as signInStore } from '@story/stores/sign-in';
import { mockStory } from '@story/utils/mock-story';

const Component = wrapPage(() => {
  return <div>{'Test'}</div>;
});
export default {
  title: 'Compositions/WrapPage',
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
