import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { Timestamp } from '@elements/components/timestamp';

export const LastActive = suspensify(({ entityId }: { entityId: string }) => {
  const lastActive = useValue('entity/updated-at', { 'entity/id': entityId });
  return (
    <Timestamp
      className={'text-xs text-gray-500'}
      // TODO i18n
      prefix={'Active'}
      relative={true}
      timestamp={lastActive}
    />
  );
});
