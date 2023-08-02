interface ProgressBarProps {
  total: number;
  current: number;
}

export const ProgressBar = ({ total, current }: ProgressBarProps) => {
  const percentage = (current / total) * 100;
  return (
    <div className={'relative h-1.5 w-full rounded bg-gray-100 shadow-inner'}>
      <div className={'absolute h-1.5 rounded bg-green-500'} style={{ width: `${percentage}%` }} />
    </div>
  );
};
