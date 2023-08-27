import { Home as Component } from '@elements/compositions/action/home';
import { store as relationshipsStore } from '@story/stores/relationships';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Action/Home',
  component: Component,
};

const store = {
  sub: {
    ...relationshipsStore.sub,
    'current.action/id': '2',
    'action/outcome': lorem.generateSentences(5),
    'action/description': lorem.generateSentences(6),
  },
  evt: [...relationshipsStore.evt],
};

export const Home = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});
