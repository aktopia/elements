import { Action as Component } from '@elements/compositions/action/action';
import { store as headerStore } from '@story/stores/action/header';
import { store as homeTabStore } from '@story/stores/action/home';
import { store as discussStore } from '@story/stores/discuss';
import { store as updateStore } from '@story/stores/updates';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/Action',
  component: Component,
};

const store = {
  read: {
    ...wrapPageStore.read,
    ...discussStore.read,
    ...updateStore.read,
    ...homeTabStore.read,
    ...headerStore.read,
  },
  dispatch: [
    ...wrapPageStore.dispatch,
    ...discussStore.dispatch,
    ...updateStore.dispatch,
    ...homeTabStore.dispatch,
    ...headerStore.dispatch,
  ],
};

export const Action = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
  parameters: { layout: 'fullscreen' },
});
