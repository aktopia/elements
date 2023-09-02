import { Modal as Component, ModalHeader, ModalPanel } from '@elements/components/modal';
import { lorem } from '@story/utils/string';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Modal',
  component: Component,
};

export const Modal: StoryObj<typeof Component> = {
  args: { visible: true, onClose: action('onClose') },
  render: (args) => {
    return (
      <Component {...args}>
        <ModalPanel>
          <div className={'flex flex-col gap-2 p-6'}>
            <ModalHeader title={'How are you?'} onClose={args.onClose} />
            <div className={'text-sm text-gray-500'}>{lorem.generateSentences(3)}</div>
          </div>
        </ModalPanel>
      </Component>
    );
  },
};
