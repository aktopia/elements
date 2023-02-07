import { ProgressBar as Component } from '@elements/components/progress-bar';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/ProgressBar',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const ProgressBar: Story = {
  render: (props) => {
    return (
      <div className={'w-full'}>
        <Component {...props} />
      </div>
    );
  },
  args: {
    total: 100,
    current: 20,
  },
};
