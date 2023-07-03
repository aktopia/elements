import { wrapPage } from '@elements/compositions/wrap-page';
import { store as headerStore } from '@story/stores/header';
import { store as signInStore } from '@story/stores/sign-in';
import { mockStory } from '@story/utils/mock-story';

const Component = wrapPage(() => {
  const text = 'Test';
  return <div>{text}</div>;
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

const args = {
  suspense: { lines: 5 },
};

export const WrapPage = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
