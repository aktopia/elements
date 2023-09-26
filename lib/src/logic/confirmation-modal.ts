import { emptyObject, ref } from '@elements/utils';
import type { Reference } from '@elements/types';
import { evt, sub } from '@elements/store';
import type { Kind } from '@elements/components/button';

export type Subs = {
  'confirmation-modal/visible': {
    params: {};
    result: boolean;
  };
  'confirmation-modal/params': {
    params: {};
    result: {
      kind: Kind;
      bodyText: string;
      cancelText: string;
      confirmText: string;
      titleText: string;
      onConfirm: () => void;
    };
  };
};

export type Events = {
  'confirmation-modal/close': {
    params: Reference;
  };
  'confirmation-modal/open': {
    params: {
      kind: Kind;
      bodyText: string;
      cancelText: string;
      confirmText: string;
      titleText: string;
      onConfirm: () => void;
    };
  };
};

export const confirmationModalSlice = () => ({
  'confirmation-modal/state': {
    'confirmation-modal/visible': false,
    'confirmation-modal/params': {},
  },
});

export const openModal = ({ setState, params }: { setState: any; params: Reference }) => {
  const key = ref(params['ref/attribute'], params['ref/id']);

  setState((state: any) => {
    state['confirmation-modal/state'][key]
      ? (state['confirmation-modal/state'][key]['confirmation-modal/visible'] = true)
      : (state['confirmation-modal/state'][key] = { 'confirmation-modal/visible': true });
  });
};

export const closeModal = ({ setState, params }: any) => {
  const key = ref(params['ref/attribute'], params['ref/id']);

  setState((state: any) => {
    state['confirmation-modal/state'][key]['confirmation-modal/visible'] = false;
  });
};

sub('confirmation-modal/visible', ({ state }: any) => {
  return state['confirmation-modal/state']['confirmation-modal/visible'];
});

sub('confirmation-modal/params', ({ state }: any) => {
  return state['confirmation-modal/state']['confirmation-modal/params'];
});

evt('confirmation-modal/close', ({ setState }) => {
  setState((state: any) => {
    state['confirmation-modal/state']['confirmation-modal/visible'] = false;
    state['confirmation-modal/state']['confirmation-modal/params'] = emptyObject;
  });
});

evt('confirmation-modal/open', async ({ params, setState }) => {
  setState((state: any) => {
    state['confirmation-modal/state']['confirmation-modal/visible'] = true;
    state['confirmation-modal/state']['confirmation-modal/params'] = params;
  });
});
