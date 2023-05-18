import { NavBar as Component } from '@elements/compositions/nav-bar';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/NavBar',
  component: Component,
};

export const NavBar: StoryObj<typeof Component> = {
  args: {},
  render: (args) => {
    return <Component {...args} />;
  },
};
