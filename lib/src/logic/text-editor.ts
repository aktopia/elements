import { evt, sub } from '@elements/store';
import { ref } from '@elements/utils';
import type { LookupRef } from '@elements/types';
import type { Evt, Sub } from '@elements/store/types';

export const textEditorSlice = () => ({
  'text-editor/state': {},
});

const textEditors: any = {};

interface Actions {
  onEditDone: ({ setState, params, getState }: any) => void;
  onEditCancel: ({ setState, params, getState }: any) => void;
  onTextUpdate: ({ setState, params, getState }: any) => void;
}

export function registerTextEditor(attribute: string, actions: Actions) {
  textEditors[attribute] = actions;
}

export type Subs = {
  'text-editor/can-edit': Sub<{ ref: LookupRef }, boolean>;
  'text-editor/editing': Sub<{ ref: LookupRef }, boolean>;
};

export type Events = {
  'text-editor/edit': Evt<{ ref: LookupRef }>;
  'text-editor.edit/done': Evt<{ ref: LookupRef }>;
  'text-editor.edit/cancel': Evt<{ ref: LookupRef }>;
  'text-editor.text/update': Evt<{ ref: LookupRef; value: string }>;
};

sub('text-editor/can-edit', ({}) => true);

sub('text-editor/editing', ({ state, params }) => {
  const key = ref(params.ref);
  return !!state['text-editor/state'][key]?.['text-editor/editing'];
});

export const startEditing = ({
  setState,
  params,
}: {
  setState: any;
  params: { ref: LookupRef };
}) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]
      ? (state['text-editor/state'][key]['text-editor/editing'] = true)
      : (state['text-editor/state'][key] = { 'text-editor/editing': true });
  });
};

export const endEditing = ({ setState, params }: any) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]['text-editor/editing'] = false;
  });
};

export const updateText = ({ setState, params }: any) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]
      ? (state['text-editor/state'][key]['text-editor/text'] = params.value)
      : (state['text-editor/state'][key] = { 'text-editor/text': params.value });
  });
};

export const text = ({ state, params }: any) => {
  const key = ref(params.ref);
  return state['text-editor/state'][key]['text-editor/text'];
};

evt('text-editor.edit/done', async (args) => {
  const { params } = args;
  const { onEditDone } = textEditors[params.ref[0]];
  onEditDone(args);
});

evt('text-editor.edit/cancel', async (args) => {
  const { params } = args;
  const { onEditCancel } = textEditors[params.ref[0]];
  onEditCancel(args);
});

evt('text-editor.text/update', (args) => {
  const { params } = args;
  const { onTextUpdate } = textEditors[params.ref[0]];
  onTextUpdate(args);
});
