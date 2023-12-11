import { Snackbar as Component } from '@elements/components/snackbar';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';

export const Snackbar = suspensify(() => {
  const visible = useValue('alert/visible');
  const message = useValue('alert/message');
  const kind = useValue('alert/kind');

  const onDismiss = useDispatch('alert/dismiss');

  return <Component kind={kind} message={message} visible={visible} onDismiss={onDismiss} />;
});
