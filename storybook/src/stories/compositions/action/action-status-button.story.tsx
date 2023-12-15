import { ActionStatusButton as Component } from '@elements/compositions/action/action-status';
import { store } from '@story/stores/action/status';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/ActionStatusButton',
  component: Component,
};

export const ActionStatusButton = mockStory<typeof Component>({
  store,
  args: { actionId: 'action-1', suspenseLines: 8 },
  render: (args) => {
    return <Component {...args} />;
  },
});
