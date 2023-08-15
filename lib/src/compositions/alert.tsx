import { Alert as Component, Kind } from '@elements/components/alert';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';

export const Alert = suspensify(() => {
  const visible = useValue<boolean>('alert/visible');
  const message = useValue<string>('alert/message');
  const kind = useValue<Kind>('alert/kind');
  const onDismiss = useDispatch('alert/dismiss');
  return <Component kind={kind} message={message} visible={visible} onDismiss={onDismiss} />;
});
