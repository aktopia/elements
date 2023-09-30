import { ActionCard as Component } from '@elements/compositions/home/action-card';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';

const store = {
  sub: {
    'action.title/text': lorem.generateSentences(1),
    'action/updated-at': randomTimestamp(),
  },
  evt: [],
};

export default {
  title: 'Compositions/Home/ActionCard',
  component: Component,
};

export const ActionCard = mockStory<typeof Component>({
  store,
  args: { suspenseLines: 8, id: 'action-1' },
  render: (args) => {
    return <Component {...args} />;
  },
});
