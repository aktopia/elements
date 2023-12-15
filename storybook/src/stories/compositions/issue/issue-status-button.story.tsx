import { IssueStatusButton as Component } from '@elements/compositions/issue/issue-status'
import { store } from '@story/stores/issue/status';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/IssueStatusButton',
  component: Component,
};

export const IssueStatusButton = mockStory<typeof Component>({
  store,
  args: { issueId: 'issue-1', suspenseLines: 8 },
  render: (args) => {
    return <Component {...args} />;
  },
});
