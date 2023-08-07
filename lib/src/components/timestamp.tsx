import { isBefore, timeAgoStr, tsNow, tsToStr } from '@elements/_utils';
import {
  Arrow as TooltipArrow,
  Content as TooltipContent,
  Portal as TooltipPortal,
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useMemo } from 'react';

const DATETIME_FORMAT = 'MMM D, YYYY [at] h:mm A';

interface TimestampProps {
  timestamp: number;
  className: string;
  relative?: boolean;
  prefix?: string;
}

export const Timestamp = ({ timestamp, className, prefix, relative = false }: TimestampProps) => {
  const [absoluteTime, relativeTime] = useMemo(() => {
    const absoluteTime = tsToStr(timestamp, DATETIME_FORMAT);
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
    <TooltipProvider delayDuration={500}>
      <TooltipRoot>
        <TooltipTrigger>
          <p className={className}>{phrase}</p>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className={'rounded-md bg-gray-700 py-2 px-2.5 text-xs text-white shadow-lg'}
            sideOffset={3}>
            <p>{tooltipTime}</p>
            <TooltipArrow className={'fill-gray-700'} />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};
