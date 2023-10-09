import { Timestamp } from '@elements/components/timestamp';

export const LastActive = ({ timestamp }: { timestamp: number }) => {
  return (
    <Timestamp
      className={'text-xs text-gray-500'}
      // TODO i18n
      prefix={'Active'}
      relative={true}
      timestamp={timestamp}
    />
  );
};
