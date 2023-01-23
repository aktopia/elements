import { Test } from '@elements/compositions/action/action-header';
import { StoryObj } from '@storybook/react';
import { MockStore } from '../../../utils/mock-store';

export default {
  title: 'Compositions/Action/Main',
  component: Test,
};

const m = {
  test: 'hello',
  else: 'amazing',
};

const d = {
  testd: (x: number, y: number) => console.log(x + y),
};

type Story = StoryObj<typeof Test>;

export const Main: Story = {
  render: () => {
    return (
      <MockStore dispatch={d} read={m}>
        <Test />
      </MockStore>
    );
  },
};
