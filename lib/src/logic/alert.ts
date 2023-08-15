import { evt, sub } from '@elements/store/register';
import { dispatch } from '@elements/store';

export const alertSlice = () => ({
  alertState: { visible: false },
});

sub('alert/visible', ({ state }) => state.alertState.visible);
sub('alert/message', ({ state }) => state.alertState.message);
sub('alert/kind', ({ state }) => state.alertState.kind);

evt('alert/dismiss', ({ setState }) => {
  setState((state: any) => {
    state.alertState.visible = false;
  });
});

evt('alert/flash', ({ setState, params }) => {
  setState((state: any) => {
    state.alertState.visible = true;
    state.alertState.message = params.message;
    state.alertState.kind = params.kind;
    setTimeout(() => {
      dispatch('alert/dismiss');
    }, 7000);
  });
});
