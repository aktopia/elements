import { Tabs } from '@elements/components/tabs';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

type Story = StoryObj<typeof Tabs>;

export const Main: Story = {
  args: {
    tabs: [
      { id: 'home', label: 'Home' },
      { id: 'updates', label: 'Updates' },
      { id: 'funding', label: 'Funding' },
      { id: 'discussion', label: 'Discussion' },
      { id: 'team', label: 'Team' },
    ],
    activeTabId: 'updates',
    onTabClick: () => {},
    size: 'md',
  },
};
