import { Locations as Component } from '@elements/compositions/issue/locations';
import { store } from '@story/stores/issue/locations';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/Locations',
  component: Component,
};

export const Locations = mockStory<typeof Component>({
  store,
  args: { suspenseLines: 8, refId: 'issue-1' },
  render: (args) => {
    return <Component {...args} />;
  },
});
