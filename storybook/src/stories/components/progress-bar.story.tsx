import { ProgressBar } from '@elements/components/progress-bar';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

type Story = StoryObj<typeof ProgressBar>;

export const Main: Story = {
  render: (props) => {
    return (
      <div className={'w-full'}>
        <ProgressBar {...props} />
      </div>
    );
  },
  args: {
    total: 100,
    current: 20,
  },
};
