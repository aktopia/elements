import { cx } from '@elements/utils';

interface ProgressBarProps {
  total: number;
  current: number;
  barClassName?: string;
}

export const ProgressBar = ({ total, current, barClassName }: ProgressBarProps) => {
  const percentage = (current / total) * 100;
  return (
    <div className={'relative h-2 w-full rounded bg-gray-100 shadow-inner'}>
      <div
        className={cx('absolute h-2 rounded', barClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
