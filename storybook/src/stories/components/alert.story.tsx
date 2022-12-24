import { Alert } from '@elements/components/alert';

export default {
  title: 'Components/Alert',
  component: Alert,
};

export const Success = {
  render: () => (
    <Alert show={true} messageText={'Success'} variant={{ type: 'success' }} onDismiss={() => {}} />
  ),
};

export const Info = {
  render: () => (
    <Alert
      show={true}
      messageText={'Information'}
      variant={{ type: 'info' }}
      onDismiss={() => {}}
    />
  ),
};

export const Warning = {
  render: () => (
    <Alert show={true} messageText={'Warning'} variant={{ type: 'warning' }} onDismiss={() => {}} />
  ),
};

export const Error = {
  render: () => (
    <Alert show={true} messageText={'Error'} variant={{ type: 'error' }} onDismiss={() => {}} />
  ),
};

// https://github.com/storybookjs/storybook/issues/12153
