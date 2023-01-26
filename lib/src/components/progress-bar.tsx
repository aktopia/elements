interface ProgressBarProps {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  return (
    <div className={'relative h-1 w-full rounded'}>
      <div className={'absolute h-1 w-full rounded bg-gray-100'} />
      <div
        className={'absolute h-1 rounded bg-green-500'}
        style={{ width: `${percentage}%` }} />
    </div>
  );
}
