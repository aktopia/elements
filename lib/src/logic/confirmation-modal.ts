import { emptyObject } from '@elements/utils';
import type { Reference } from '@elements/types';
import type { ButtonKind } from '@elements/components/button';
import type { Evt, Sub } from '@elements/store/types';
import { evt, sub } from '@elements/store/register';

export type Subs = {
  'confirmation-modal/visible': Sub<{}, boolean>;
  'confirmation-modal/params': Sub<
    {},
    {
      kind: ButtonKind;
      bodyText: string;
      cancelText: string;
      confirmText: string;
      titleText: string;
      onConfirm: () => void | Promise<void>;
    }
  >;
};

export type Events = {
  'confirmation-modal/close': Evt<Reference>;
  'confirmation-modal/open': Evt<{
    kind: ButtonKind;
    bodyText: string;
    cancelText: string;
    confirmText: string;
    titleText: string;
    onConfirm: () => void | Promise<void>;
  }>;
};

export const confirmationModalSlice = () => ({
  'confirmation-modal/state': {
    'confirmation-modal/visible': false,
    'confirmation-modal/params': {},
  },
});

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
