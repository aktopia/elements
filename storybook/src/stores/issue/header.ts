import { store as votingStore } from '@story/stores/voting';
import { store as confirmationModalStore } from '@story/stores/confirmation-modal';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';
import { store as textEditorStore } from '@story/stores/text-editor';

export const store = {
  sub: {
    ...votingStore.sub,
    'current.issue/id': '1',
    'current.user/id': '2',
    'issue.users.facing/count': 3700,
    'issue.current.user/facing': true,
    'issue/saved': false,
    'issue/followed': false,
    'issue.follow/count': 2600,
    'issue.title/text': lorem.generateSentences(1),
    'issue.tabs/active-tab': 'locations',
    'issue/updated-at': randomTimestamp(),
    'issue/can-delete': false,
  },

  evt: [
    ...votingStore.evt,
    ...textEditorStore.evt,
    ...confirmationModalStore.evt,
    'issue.current.user/face',
    'issue/follow',
    'issue/unfollow',
    'issue/save',
    'issue/unsave',
    'issue.severity/reset',
    'issue.tabs/update',
    'issue/delete',
  ],
};
