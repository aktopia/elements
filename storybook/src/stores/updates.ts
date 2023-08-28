import { store as votingStore } from '@story/stores/voting';
import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';
import { store as textEditorStore } from '@story/stores/text-editor';

export const store = {
  sub: {
    ...votingStore.sub,
    'update.deletion/id': null,
    'current.user/id': '1',
    'update/creator-name': 'Sunil KS',
    'update/created-at': randomTimestamp(),
    'update/ids': ['1', '2', '3'],
    'update/text': lorem.generateSentences(8),
    'user/name': 'Krishna Sunil',
  },
  evt: [
    ...votingStore.evt,
    ...textEditorStore.evt,
    'new.update/create',
    'new.update/update',
    'update.deletion/cancel',
    'update.deletion/start',
    'update/delete',
  ],
};
