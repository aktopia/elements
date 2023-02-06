import { Alert as Component, Kind } from '@elements/components/alert';
import { useDispatch, useValue } from '@elements/store';

export const Alert = () => {
  const show = useValue<boolean>('alert/show');
  const message = useValue<string>('alert/message');
  const kind = useValue<Kind>('alert/kind');
  const onDismiss = useDispatch('alert/dismiss');
  return <Component kind={kind} messageText={message} show={show} onDismiss={onDismiss} />;
};
