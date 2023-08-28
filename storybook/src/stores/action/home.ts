import { store as relationshipsStore } from '@story/stores/relationships';
import { lorem } from '@story/utils/string';
import { store as textEditorStore } from '@story/stores/text-editor';

export const store = {
  sub: {
    ...relationshipsStore.sub,
    'current.action/id': '2',
    'action.outcome/text': lorem.generateSentences(5),
    'action.description/text': lorem.generateSentences(6),
  },
  evt: [...relationshipsStore.evt, ...textEditorStore.evt],
};
