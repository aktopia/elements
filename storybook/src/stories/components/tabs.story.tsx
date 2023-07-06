import { Tabs as Component } from '@elements/components/tabs';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Tabs',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const Tabs: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home' },
      { id: 'updates', label: 'Updates' },
      { id: 'funding', label: 'Funding' },
      { id: 'discuss', label: 'Discuss' },
      { id: 'team', label: 'Team' },
    ],
    activeTabId: 'updates',
    onTabClick: action('onTabClick'),
    size: 'md',
  },
};
