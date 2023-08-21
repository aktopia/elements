import { evt, sub } from '@elements/store/register';
import { ref } from '@elements/utils';

export const textEditorSlice = () => ({
  'text-editor/state': {},
});

const textEditors: any = {};

interface Actions {
  onEditStart: ({ setState, params, getState }: any) => void;
  onEditDone: ({ setState, params, getState }: any) => void;
  onEditCancel: ({ setState, params, getState }: any) => void;
  onTextUpdate: ({ setState, params, getState }: any) => void;
}

export function registerTextEditor(attribute: string, actions: Actions) {
  textEditors[attribute] = actions;
}

sub('text-editor/can-edit', ({ state }) => true);

sub('text-editor/editing', ({ state, params }) => {
  const key = ref(params['ref/attribute'], params['ref/id']);
  return !!state['text-editor/state'][key]?.['text-editor/editing'];
});

export const startEditing = ({ setState, params }: any) => {
  const key = ref(params['ref/attribute'], params['ref/id']);

  setState((state: any) => {
    state['text-editor/state'][key]
      ? (state['text-editor/state'][key]['text-editor/editing'] = true)
      : (state['text-editor/state'][key] = { 'text-editor/editing': true });
  });
};

export const endEditing = ({ setState, params }: any) => {
  const key = ref(params['ref/attribute'], params['ref/id']);

  setState((state: any) => {
    state['text-editor/state'][key]['text-editor/editing'] = false;
  });
};

export const updateText = ({ setState, params }: any) => {
  const key = ref(params['ref/attribute'], params['ref/id']);

  setState((state: any) => {
    state['text-editor/state'][key]
      ? (state['text-editor/state'][key]['text-editor/text'] = params.value)
      : (state['text-editor/state'][key] = { 'text-editor/text': params.value });
  });
};

export const text = ({ state, params }: any) => {
  const key = ref(params['ref/attribute'], params['ref/id']);
  return state['text-editor/state'][key]['text-editor/text'];
};

evt('text-editor/edit', (args) => {
  const { params } = args;
  const { onEditStart } = textEditors[params['ref/attribute']];
  onEditStart(args);
});

evt('text-editor.edit/done', async (args) => {
  const { params } = args;
  const { onEditDone } = textEditors[params['ref/attribute']];
  onEditDone(args);
});

evt('text-editor.edit/cancel', async (args) => {
  const { params } = args;
  const { onEditCancel } = textEditors[params['ref/attribute']];
  onEditCancel(args);
});

evt('text-editor.text/update', (args) => {
  const { params } = args;
  const { onTextUpdate } = textEditors[params['ref/attribute']];
  onTextUpdate(args);
});
