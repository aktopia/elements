import { isBefore, timeAgoStr, tsNow, tsToStr } from '@elements/_utils';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useMemo } from 'react';

const dateTimeFormat = 'MMM D, YYYY [at] h:mm A';

export const Timestamp = ({ timestamp, className }: { timestamp: number; className: string }) => {
  const [time, tooltipTime] = useMemo(() => {
    const now = tsNow();

    const absoluteTime = tsToStr(timestamp, dateTimeFormat);
    const relativeTime = timeAgoStr(timestamp);

    return isBefore(timestamp, now, 'month')
      ? [absoluteTime, relativeTime]
      : [relativeTime, absoluteTime];
  }, [timestamp]);

  return (
    <Tooltip.Provider delayDuration={500}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <p className={className}>{time}</p>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={'rounded-md bg-gray-600 py-1 px-2 text-xs text-white shadow-md'}>
            <p>{tooltipTime}</p>
            <Tooltip.Arrow className={'fill-gray-600'} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
