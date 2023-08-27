import { store as votingStore } from '@story/stores/voting';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';

export const store = {
  sub: {
    ...votingStore.read,
    'current.issue/id': '1',
    'current.user/id': '2',
    'issue/saved': false,
    'issue/followed': false,
    'issue.follow/count': 2600,
    'issue/title': lorem.generateSentences(1),
    'issue.tabs/active-tab-id': 'locations',
    'issue/last-active-at': randomTimestamp(),
  },

  evt: [
    ...votingStore.dispatch,
    'issue/follow',
    'issue/unfollow',
    'issue/save',
    'issue/unsave',
    'issue.severity/reset',
    'issue.tabs/update',
  ],
};
