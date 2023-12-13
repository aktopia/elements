import { ActionCard as Component } from '@elements/compositions/action/action-card';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';
import { action } from '@storybook/addon-actions';

const store = {
  sub: {
    'action.title/text': lorem.generateSentences(1),
    'action/updated-at': randomTimestamp(),
    'action.status/check': false,
    'action.locality/exists': false,
    'action.locality/caption': lorem.generateSentences(1),
  },
  evt: [],
};

export default {
  title: 'Compositions/Home/ActionCard',
  component: Component,
};

export const ActionCard = mockStory<typeof Component>({
  store,
  args: {
    suspenseLines: 8,
    id: 'action-1',
    onLocalitySlideOverOpen: action('onLocalitySlideOverOpen'),
  },
  render: (args) => {
    return <Component {...args} />;
  },
});
