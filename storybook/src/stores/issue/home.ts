import { store as relationshipsStore } from '@story/stores/relationships';
import { store as textEditorStore } from '@story/stores/text-editor';
import { lorem } from '@story/utils/string';

export const store = {
  sub: {
    ...relationshipsStore.sub,
    'current.issue/id': '2',
    'issue.resolution/text': lorem.generateSentences(5),
    'issue.description/text': lorem.generateSentences(6),
  },
  evt: [...relationshipsStore.evt, ...textEditorStore.evt],
};
