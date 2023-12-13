import { ActionStatusModal as Component } from '@elements/compositions/action/action-status';
import { store } from '@story/stores/action/status';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/ActionStatusModal',
  component: Component,
};

export const ActionStatusModal = mockStory({
  store,
  args: { suspenseLines: 8 },
  render: () => {
    return <Component />;
  },
});
