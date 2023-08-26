import { Alert as Component } from '@elements/components/alert';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';

export const Alert = suspensify(() => {
  const visible = useValue('alert/visible');
  const message = useValue('alert/message');
  const kind = useValue('alert/kind');

  const onDismiss = useDispatch('alert/dismiss');

  return <Component kind={kind} message={message} visible={visible} onDismiss={onDismiss} />;
});
