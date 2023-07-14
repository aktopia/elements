import { Map as Component } from '@elements/components/map/map';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Map',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const Map: Story = {
  args: {
    addLocation: action('addLocation'),
    updateCenter: action('updateCenter'),
  },
};
