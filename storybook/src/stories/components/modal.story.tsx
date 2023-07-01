import { Modal as Component } from '@elements/components/modal';
import { lorem } from '@story/utils/string';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Modal',
  component: Component,
};

export const Modal: StoryObj<typeof Component> = {
  args: { title: 'How are you?', visible: true, onClose: action('onClose') },
  render: (args) => {
    return (
      <Component {...args}>
        <div className={'text-sm text-gray-500'}>{lorem.generateSentences(3)}</div>
      </Component>
    );
  },
};
