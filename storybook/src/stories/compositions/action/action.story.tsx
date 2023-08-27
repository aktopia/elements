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
  sub: {
    ...wrapPageStore.sub,
    ...discussStore.sub,
    ...updateStore.sub,
    ...homeTabStore.sub,
    ...headerStore.sub,
  },
  evt: [
    ...wrapPageStore.evt,
    ...discussStore.evt,
    ...updateStore.evt,
    ...homeTabStore.evt,
    ...headerStore.evt,
  ],
};

export const Action = mockStory<typeof Component>({
  store,
  args: { suspenseLines: 8 },
  render: (args) => {
    return <Component {...args} />;
  },
  parameters: { layout: 'fullscreen' },
});
