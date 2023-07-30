import { isBefore, timeAgoStr, tsNow, tsToStr } from '@elements/_utils';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useMemo } from 'react';

const dateTimeFormat = 'MMM D, YYYY [at] h:mm A';

interface TimestampProps {
  timestamp: number;
  className: string;
  relative?: boolean;
  prefix?: string;
}

export const Timestamp = ({ timestamp, className, prefix, relative = false }: TimestampProps) => {
  const [absoluteTime, relativeTime] = useMemo(() => {
    const absoluteTime = tsToStr(timestamp, dateTimeFormat);
    const relativeTime = timeAgoStr(timestamp);

    return [absoluteTime, relativeTime];
  }, [timestamp]);

  const [time, tooltipTime] = useMemo(() => {
    if (relative) {
      return [relativeTime, absoluteTime];
    }

    const now = tsNow();

    return isBefore(timestamp, now, 'month')
      ? [absoluteTime, relativeTime]
      : [relativeTime, absoluteTime];
  }, [timestamp, relativeTime, absoluteTime, relative]);

  const phrase = prefix ? `${prefix} ${time}` : time;

  return (
    <Tooltip.Provider delayDuration={500}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <p className={className}>{phrase}</p>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={'rounded-md bg-gray-700 py-2 px-2.5 text-xs text-white shadow-lg'}
            sideOffset={3}>
            <p>{tooltipTime}</p>
            <Tooltip.Arrow className={'fill-gray-700'} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};