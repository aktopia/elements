import { dispatch, evt, sub } from '@elements/store';

export type Kind = 'info' | 'success' | 'warning' | 'error';

export type Subs = {
  'alert/visible': {
    params: {};
    result: boolean;
  };
  'alert/message': {
    params: {};
    result: string;
  };
  'alert/kind': {
    params: {};
    result: Kind;
  };
};

export type Events = {
  'alert/dismiss': {
    params: {};
  };
  'alert/flash': {
    params: {
      message: string;
      kind: string;
    };
  };
};

export const alertSlice = () => ({
  ['alert/state']: { 'alert/visible': false },
});

sub('alert/visible', ({ state }) => state['alert/state']['alert/visible']);
sub('alert/message', ({ state }) => state['alert/state']['alert/message']);
sub('alert/kind', ({ state }) => state['alert/state']['alert/kind']);

evt('alert/dismiss', ({ setState }) => {
  setState((state: any) => {
    state['alert/state']['alert/visible'] = false;
  });
});

evt('alert/flash', ({ setState, params }) => {
  setState((state: any) => {
    state['alert/state']['alert/message'] = params.message;
    state['alert/state']['alert/kind'] = params.kind;
    state['alert/state']['alert/visible'] = true;
    setTimeout(() => {
      dispatch('alert/dismiss');
    }, 7000);
  });
});
