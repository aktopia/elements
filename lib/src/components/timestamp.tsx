import { isBefore, timeAgoStr, tsNow, tsToStr } from '@elements/_utils';
import {
  RawButton,
  RawOverlayArrow,
  RawTooltip,
  RawTooltipTrigger,
} from '@elements/components/_raw';
import { ReactNode, useMemo } from 'react';

const dateTimeFormat = 'MMM D, YYYY [at] h:mm A';

const CaretDown = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      fill={'currentColor'}
      fillOpacity={'0.95'}
      viewBox={'0 0 52 52'}
      xmlSpace={'preserve'}>
      <path
        d={
          'M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z'
        }
      />
    </svg>
  );
};

const TextTooltip = ({ children }: { children: ReactNode }) => {
  return (
    <RawTooltip
      className={'mb-3 rounded-md bg-gray-700 py-1 px-1.5 text-xs text-white opacity-80 shadow-md'}>
      {children}
      <RawOverlayArrow>
        <CaretDown className={'-mt-1.5 h-4 w-4 text-gray-700'} />
      </RawOverlayArrow>
    </RawTooltip>
  );
};

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
    <RawTooltipTrigger delay={500}>
      <RawButton className={className}>{time}</RawButton>
      <TextTooltip>
        <p>{tooltipTime}</p>
      </TextTooltip>
    </RawTooltipTrigger>
  );
};
