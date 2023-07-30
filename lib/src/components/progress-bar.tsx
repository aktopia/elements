interface ProgressBarProps {
  total: number;
  current: number;
}

export const ProgressBar = ({ total, current }: ProgressBarProps) => {
  const percentage = (current / total) * 100;
  return (
    <div className={'relative h-2 w-full rounded'}>
      <div className={'absolute h-2 w-full rounded bg-gray-100 shadow-inner'} />
      <div className={'absolute h-2 rounded bg-green-500'} style={{ width: `${percentage}%` }} />
    </div>
  );
};
