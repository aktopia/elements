import { Link } from '@elements/components/link';
import { LightBulbSolid, SparklesSolid } from '@elements/icons';
import { cva } from 'cva';
import { Status } from '@elements/logic/meta/initiative';

const containerVariant = cva('w-full flex items-center justify-center', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-2',
    },
  },
});

const iconVariant = cva('text-blue-600', {
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-10 w-10',
    },
  },
});

const textVariant = cva('text-gray-600', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
});

const linkVariant = cva('text-blue-700 hover:underline', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
});

const getStuff = (status: Status) => {
  switch (status) {
    case Status.Evaluating:
      return ['This initiative is under evaluation.', 'Share your thoughts here.', LightBulbSolid];
    case Status.Planning:
      return ['This initiative is being planned.', 'You can follow it here.', LightBulbSolid];
    case Status.Planned:
      return ['This initiative has been prioritised.', 'Track the status here.', SparklesSolid];
    case Status.InProgress:
      return ['This initiative is in progress.', 'Track the status here.', SparklesSolid];
    default:
      return ['This initiative is coming soon.', 'You can follow it here.', SparklesSolid];
  }
};

interface ComingSoonProps {
  slug: string;
  status: Status;
  size?: 'sm' | 'md';
}

export const ComingSoon = ({ status, slug, size = 'md' }: ComingSoonProps) => {
  const [statusText, linkText, Icon] = getStuff(status);

  return (
    <div className={containerVariant({ size })}>
      <Icon className={iconVariant({ size })} />
      <div className={'flex flex-col gap-1 flex-wrap items-start'}>
        <p className={textVariant({ size })}>{statusText as string}</p>
        <Link className={linkVariant({ size })} href={`/meta/initiative/${slug}`}>
          {linkText as string}
        </Link>
      </div>
    </div>
  );
};
