import { Link } from '@elements/components/link';
import { LightBulbSolid } from '@elements/icons';

export const MakeUsBetter = () => {
  const text = 'Improve Aktopia';
  return (
    <Link
      className={
        'w-max flex rounded-full bg-emerald-500 shadow-lg items-center border border-emerald-300 gap-1.5 pr-3 pl-2.5 justify-center py-1.5'
      }
      href={'/meta/initiatives'}>
      <LightBulbSolid className={'h-3 w-3 text-white'} />
      <p className={'text-xs text-white'}>{text}</p>
    </Link>
  );
};
