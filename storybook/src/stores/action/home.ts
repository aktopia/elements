import { store as relationshipsStore } from '@story/stores/relationships';
import { lorem } from '@story/utils/string';

export const store = {
  read: {
    ...relationshipsStore.read,
    'current.action/id': '2',
    'action/outcome': lorem.generateSentences(5),
    'action/description': lorem.generateSentences(6),
  },
  dispatch: [...relationshipsStore.dispatch],
};
