import { store as votingStore } from '@story/stores/voting';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';

const inProgress = {
  'in-progress': false,
  id: null,
};

export const store = {
  read: {
    ...votingStore.read,
    'update.deletion/in-progress': inProgress,
    'current.user/id': '1',
    'update/creator-name': 'Sunil KS',
    'update/created-at': randomTimestamp(),
    'update/ids-by-reference': ['1', '2', '3'],
    'update/text': lorem.generateSentences(8),
    'user/name': 'Krishna Sunil',
  },
  dispatch: [
    ...votingStore.dispatch,
    'new.update/post',
    'new.update/update',
    'update.deletion/cancel',
    'update.deletion/start',
    'update/delete',
  ],
};
