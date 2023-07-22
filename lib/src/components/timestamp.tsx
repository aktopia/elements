import { isBefore, timeAgoStr, tsNow, tsToStr } from '@elements/_utils';
import { useMemo } from 'react';

const dateTimeFormat = 'MMM D, YYYY [at] h:mm A';

export const Timestamp = ({ timestamp, className }: { timestamp: number; className: string }) => {
  const formattedTime = useMemo(() => {
    const now = tsNow();

    return isBefore(timestamp, now, 'month')
      ? tsToStr(timestamp, dateTimeFormat)
      : timeAgoStr(timestamp);
  }, [timestamp]);

  return <p className={className}>{formattedTime}</p>;
};
