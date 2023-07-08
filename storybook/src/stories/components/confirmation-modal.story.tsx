import { ConfirmationModal as Component } from '@elements/components/confirmation-modal';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/ConfirmationModal',
  component: Component,
};

export const ConfirmationModal: StoryObj<typeof Component> = {
  args: {
    visible: true,
    onClose: action('onClose'),
    onConfirm: action('onConfirm'),
    kind: 'success',
    titleText: 'Payment Successful',
    bodyText: 'Your payment has been successfully processed.',
    confirmText: 'OK',
    cancelText: 'Cancel',
  },
  render: (args) => {
    return <Component {...args} />;
  },
};
