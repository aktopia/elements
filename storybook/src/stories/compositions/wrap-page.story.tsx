import { wrapPage } from '@elements/compositions/wrap-page';
import { store } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';

const Component = wrapPage(() => {
  const text = 'Test';
  return <div>{text}</div>;
});
export default {
  title: 'Compositions/WrapPage',
  component: Component,
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
