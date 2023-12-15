import { IssueStatus } from '@elements/logic/issue';

const issueId = 'issue-1';

export const store = {
  sub: {
    'issue.status/modal': { visible: true, 'issue/id': issueId },
    'issue/status': IssueStatus.Draft,
    'issue.status/can-update': false,
    'issue/id': issueId,
  },
  evt: ['issue.status.modal/close', 'issue.status.modal/open', 'issue.status/update'],
};
