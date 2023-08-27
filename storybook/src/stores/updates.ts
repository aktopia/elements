import { store as votingStore } from '@story/stores/voting';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';

export const store = {
  sub: {
    ...votingStore.read,
    'update.deletion/id': null,
    'current.user/id': '1',
    'update/creator-name': 'Sunil KS',
    'update/created-at': randomTimestamp(),
    'update/ids': ['1', '2', '3'],
    'update/text': lorem.generateSentences(8),
    'user/name': 'Krishna Sunil',
  },
  evt: [
    ...votingStore.dispatch,
    'new.update/create',
    'new.update/update',
    'update.deletion/cancel',
    'update.deletion/start',
    'update/delete',
  ],
};
