import { store as votingStore } from '@story/stores/voting';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';
import { store as textEditorStore } from '@story/stores/text-editor';

export const store = {
  sub: {
    ...votingStore.sub,
    'current.issue/id': '1',
    'current.user/id': '2',
    'issue/saved': false,
    'issue/followed': false,
    'issue.follow/count': 2600,
    'issue/title': lorem.generateSentences(1),
    'issue.tabs/active-tab-id': 'locations',
    'issue/updated-at': randomTimestamp(),
  },

  evt: [
    ...votingStore.evt,
    ...textEditorStore.evt,
    'issue/follow',
    'issue/unfollow',
    'issue/save',
    'issue/unsave',
    'issue.severity/reset',
    'issue.tabs/update',
  ],
};
