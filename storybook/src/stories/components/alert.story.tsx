import { Alert } from '@elements/components/alert';

export default {
  title: 'Components/Alert',
  component: Alert,
};

export const Success = {
  render: () => <Alert show={true} messageText={'Success'} variant={{ type: 'success' }} />,
};

export const Info = {
  render: () => <Alert show={true} messageText={'Information'} variant={{ type: 'info' }} />,
};

export const Warning = {
  render: () => <Alert show={true} messageText={'Warning'} variant={{ type: 'warning' }} />,
};

export const Error = {
  render: () => <Alert show={true} messageText={'Error'} variant={{ type: 'error' }} />,
};

// https://github.com/storybookjs/storybook/issues/12153
