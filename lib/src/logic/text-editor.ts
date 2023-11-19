import { evt, sub } from '@elements/store';
import { ref } from '@elements/utils';
import type { LookupRef } from '@elements/types';
import type { Evt, Sub } from '@elements/store/types';
import type { EventHandlerArgs } from '@elements/store/register';

interface Action {
  setState: any;
  params: { ref: LookupRef };
  getState: any;
}

interface Actions {
  onEditDone: (args: EventHandlerArgs<'text-editor.edit/done'>) => void | Promise<void>;
  onEditCancel: (args: EventHandlerArgs<'text-editor.edit/cancel'>) => void;
  onTextUpdate: (args: EventHandlerArgs<'text-editor.text/update'>) => void;
}

export type Subs = {
  'text-editor/editing': Sub<{ ref: LookupRef }, boolean>;
  'text-editor/error': Sub<{ ref: LookupRef }, string>;
  'text-editor/reset': Sub<{ ref: LookupRef }, boolean>;
};

export type Events = {
  'text-editor/edit': Evt<{ ref: LookupRef }>;
  'text-editor.edit/done': Evt<{ ref: LookupRef }>;
  'text-editor.edit/cancel': Evt<{ ref: LookupRef }>;
  'text-editor.text/update': Evt<{ ref: LookupRef; value: string }>;
  'text-editor.reset/complete': Evt<{ ref: LookupRef }>;
};

const textEditors: Record<string, Actions> = {};

export function registerTextEditor(attribute: string, actions: Actions) {
  textEditors[attribute] = actions;
}

export const textEditorSlice = () => ({
  'text-editor/state': {},
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

export const cancelEditing = ({ setState, params }: any) => {
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

export const text = ({ getState, params }: { getState: any; params: { ref: LookupRef } }) => {
  const key = ref(params.ref);
  return getState()['text-editor/state']?.[key]?.['text-editor/text'];
};

export const isEmpty = ({ getState, params }: { getState: any; params: { ref: LookupRef } }) => {
  const text_ = text({ getState, params });
  return !text_ || text_.trim().length === 0;
};

export const setError = ({
  setState,
  params,
}: {
  setState: any;
  params: { ref: LookupRef; error: string };
}) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]
      ? (state['text-editor/state'][key]['text-editor/error'] = params.error)
      : (state['text-editor/state'][key] = { 'text-editor/error': params.error });
  });
};

export const error = ({ getState, params }: any) => {
  const key = ref(params.ref);
  return getState()['text-editor/state'][key]?.['text-editor/error'];
};

export const hasError = ({ getState, params }: any) => {
  const key = ref(params.ref);
  return !!getState()['text-editor/state'][key]?.['text-editor/error'];
};

export const clearError = ({ setState, params }: { params: { ref: LookupRef }; setState: any }) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]['text-editor/error'] = null;
  });
};

export const resetText = ({ setState, params }: any) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]['text-editor/reset'] = true;
  });
};

export const onTextUpdateDefault = (args: Action) => {
  if (hasError(args)) {
    clearError(args);
  }
  updateText(args);
};

export const onEditCancelDefault = (args: Action) => {
  if (hasError(args)) {
    clearError(args);
  }
  resetText(args);
  endEditing(args);
};

sub('text-editor/editing', ({ state, params }) => {
  const key = ref(params.ref);
  return !!state['text-editor/state'][key]?.['text-editor/editing'];
});

sub('text-editor/error', ({ state, params }) => {
  const key = ref(params.ref);
  return state['text-editor/state'][key]?.['text-editor/error'];
});

sub('text-editor/reset', ({ state, params }) => {
  const key = ref(params.ref);
  return state['text-editor/state'][key]?.['text-editor/reset'];
});

evt('text-editor.edit/done', async (args) => {
  const { params } = args;
  const { onEditDone } = textEditors[params.ref[0]];
  await onEditDone(args);
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

evt('text-editor.reset/complete', ({ params, setState }) => {
  const key = ref(params.ref);

  setState((state: any) => {
    state['text-editor/state'][key]['text-editor/reset'] = false;
  });
});

/*
TODO
- Handle race conditions (major thinking required)
 */
