import { Link } from '@elements/components/link';
import { Wheel } from '@elements/icons';

export const MakeUsBetter = () => {
  const text = "Drive Aktopia's future. Track progress and suggest what's next.";
  return (
    <Link
      className={
        'flex rounded-full flex-wrap gap-2 pr-3 pl-2.5 justify-center py-1.5 hover:underline decoration-white items-center'
      }
      href={'/meta/initiatives'}>
      <Wheel className={'h-8 w-8 text-white animate-[spin_2s_ease-in-out_infinite] stroke-4'} />
      <p className={'text-xl text-center break-words text-white font-medium'}>{text}</p>
    </Link>
  );
};
