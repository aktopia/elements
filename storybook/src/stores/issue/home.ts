import { store as relationshipsStore } from '@story/stores/relationships';
import { lorem } from '@story/utils/string';

export const store = {
  read: {
    ...relationshipsStore.read,
    'current.issue/id': '2',
    'issue/resolution': lorem.generateSentences(5),
    'issue/description': lorem.generateSentences(6),
  },
  dispatch: [...relationshipsStore.dispatch],
};
