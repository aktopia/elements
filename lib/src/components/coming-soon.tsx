import { Link } from '@elements/components/link';
import { LightBulbSolid, SparklesSolid } from '@elements/icons';

const getStuff = (status: string) => {
  switch (status) {
    case 'evaluating':
      return [
        'The feasibility of this feature is under evaluation.',
        'You can participate here.',
        LightBulbSolid,
      ];
    case 'planning':
      return ['This feature is being planned.', 'You can follow it here.', SparklesSolid];
    case 'planned':
      return [
        "This feature is in the pipeline but the work hasn't begun yet.",
        'You can contribute here.',
        SparklesSolid,
      ];
    case 'in-progress':
      return ['This feature is in progress.', 'You can track the status here.', SparklesSolid];
    default:
      return ['This feature is coming soon.', 'You can follow it here.', SparklesSolid];
  }
};

export const ComingSoon = ({ status, id }: any) => {
  const [statusText, linkText, Icon] = getStuff(status);
  return (
    <div className={'w-full  flex gap-4 items-center justify-center'}>
      <Icon className={'h-10 w-10 text-blue-500'} />
      <div className={'flex flex-col gap-1 flex-wrap items-start'}>
        <p className={'text-gray-600'}>{statusText as string}</p>
        <Link className={'text-blue-600 hover:underline'} href={`/features/${id}`}>
          {linkText as string}
        </Link>
      </div>
    </div>
  );
};
