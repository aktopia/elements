import { ComboBox as Component } from '@elements/components/combo-box';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/ComboBox',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const ComboBox: Story = {
  args: {
    onChange: action('onChange'),
    onChoose: action('onChoose'),
    options: [],
  },
};
