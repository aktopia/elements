import { Link } from '@elements/components/link';
import { LightBulbSolid, SparklesSolid } from '@elements/icons';

export type Status = 'evaluating' | 'planning' | 'planned' | 'in-progress' | 'coming-soon';

const getStuff = (status: string) => {
  switch (status) {
    case 'evaluating':
      return ['This feature is under evaluation.', 'Share your thoughts here.', LightBulbSolid];
    case 'planning':
      return ['This feature is being planned.', 'You can follow it here.', LightBulbSolid];
    case 'planned':
      return [
        "This feature is in the pipeline but the work hasn't started yet.",
        'You can contribute here.',
        SparklesSolid,
      ];
    case 'in-progress':
      return ['This feature is in progress.', 'Track the status here.', SparklesSolid];
    default:
      return ['This feature is coming soon.', 'You can follow it here.', SparklesSolid];
  }
};

export const ComingSoon = ({ status, id }: { id: string; status: Status }) => {
  const [statusText, linkText, Icon] = getStuff(status);
  return (
    <div className={'w-full flex gap-2 items-center justify-center'}>
      <Icon className={'h-10 w-10 text-blue-500'} />
      <div className={'flex flex-col gap-1 flex-wrap items-start'}>
        <p className={'text-gray-600'}>{statusText as string}</p>
        <Link className={'text-blue-600 hover:underline'} href={`/meta/features/${id}`}>
          {linkText as string}
        </Link>
      </div>
    </div>
  );
};
