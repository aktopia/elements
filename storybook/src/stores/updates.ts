import { lorem } from '@story/utils/string';

const inProgress = {
  'in-progress': false,
  id: null,
};

export const store = {
  read: {
    'update.deletion/in-progress': inProgress,
    'current.user/id': '1',
    'update/creator-name': 'Sunil KS',
    'update/ids-by-reference': ['1', '2', '3'],
    'update/text': lorem.generateSentences(8),
    'user/name': 'Krishna Sunil',
  },
  dispatch: [
    'new.update/post',
    'new.update/update',
    'update.deletion/cancel',
    'update.deletion/start',
    'update/delete',
  ],
};
