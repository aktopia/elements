import { CreateModal as Component } from '@elements/compositions/action/create-modal';
import { store } from '@story/stores/action/create-modal';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/CreateModal',
  component: Component,
};

export const CreateModal = mockStory({
  store,
  args: { suspenseLines: 8 },
  render: () => {
    return <Component />;
  },
});
