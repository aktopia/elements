import { NamedSwitch as Component } from '@elements/components/named-switch';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/NamedSwitch',
  component: Component,
};

export const NamedSwitch: StoryObj<typeof Component> = {
  args: {
    activeSwitchId: 'phone',
    switches: [
      { id: 'phone', label: 'Phone' },
      { id: 'email', label: 'Email' },
      { id: 'social', label: 'Social' },
    ],
    size: 'xs',
    onSwitchClick: action('onSwitchClick'),
  },
};
