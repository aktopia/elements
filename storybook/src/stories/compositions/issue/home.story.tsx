import { Home as Component } from '@elements/compositions/issue/home';
import { store as relationshipsStore } from '@story/stores/relationships';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Issue/Home',
  component: Component,
};

const store = {
  sub: {
    ...relationshipsStore.read,
    'current.issue/id': '2',
    'issue/resolution': lorem.generateSentences(5),
    'issue/description': lorem.generateSentences(6),
  },
  evt: [...relationshipsStore.dispatch],
};

export const Home = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});
