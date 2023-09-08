import { Issue as Component } from '@elements/compositions/issue/issue';
import { store as discussStore } from '@story/stores/discuss';
import { store as headerStore } from '@story/stores/issue/header';
import { store as homeTabStore } from '@story/stores/issue/home';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Issue/Issue',
  component: Component,
};

const locationsStore = {
  sub: {
    'location/data': [
      { lng: 78.9629, lat: 20.5937, caption: lorem.generateSentences(1), id: '1' },
      { lng: 80.237617, lat: 13.067439, caption: lorem.generateSentences(1), id: '2' },
    ],
    'issue.location.default/center': { lng: 78.9629, lat: 20.5937 },
    'issue.location.slide-over/visible': false,
  },
  evt: [
    'issue.location.slide-over/open',
    'issue.location.slide-over/close',
    'issue.location/add',
    'issue.new.location.center/update',
    'issue.new.location.caption/update',
  ],
};

const store = {
  sub: {
    ...wrapPageStore.sub,
    ...headerStore.sub,
    ...discussStore.sub,
    ...homeTabStore.sub,
    ...locationsStore.sub,
    'current.issue/id': 'issue-1',
    'current.user/id': '2',
  },
  evt: [
    ...wrapPageStore.evt,
    ...headerStore.evt,
    ...discussStore.evt,
    ...homeTabStore.evt,
    ...locationsStore.evt,
  ],
};

export const Issue = mockStory<typeof Component>({
  store,
  args: { suspenseLines: 8 },
  render: (args) => {
    return <Component {...args} />;
  },
  parameters: { layout: 'fullscreen' },
});
