import { lorem } from '@story/utils/string';

export const store = {
  read: {
    'current.issue/id': '1',
    'current.user/id': '2',
    'issue/title': lorem.generateSentences(1),
    'issue/last-active': 'ADD-ME',
    'issue.tabs/active-tab-id': 'home',
  },
  dispatch: [],
};
