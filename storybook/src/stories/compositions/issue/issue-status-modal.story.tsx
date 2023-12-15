import { IssueStatusModal as Component } from '@elements/compositions/issue/issue-status';
import { store } from '@story/stores/issue/status';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/IssueStatusModal',
  component: Component,
};

export const IssueStatusModal = mockStory({
  store,
  args: { suspenseLines: 8 },
  render: () => {
    return <Component />;
  },
});
