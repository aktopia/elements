import { Button as Component } from '@elements/components/button';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Component,
};

export const Button: StoryObj<typeof Component> = {
  args: {
    onClick: action('onClick'),
    kind: 'primary',
    value: 'Button',
  },
  render: (args) => {
    return (
      <div className={'flex-column flex gap-10'}>
        <div className={'flex items-end gap-10'}>
          <Component {...args} size={'xxs'} />
          <Component {...args} size={'xs'} />
          <Component {...args} size={'sm'} />
          <Component {...args} size={'md'} />
        </div>
      </div>
    );
  },
};
