import { Link } from '@elements/components/link';
import { LightBulbSolid, SparklesSolid } from '@elements/icons';
import { cva } from 'cva';

export type Status = 'evaluating' | 'planning' | 'planned' | 'in-progress' | 'coming-soon';

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

const getStuff = (status: string) => {
  switch (status) {
    case 'evaluating':
      return ['This feature is under evaluation.', 'Share your thoughts here.', LightBulbSolid];
    case 'planning':
      return ['This feature is being planned.', 'You can follow it here.', LightBulbSolid];
    case 'planned':
      return ['This feature has been prioritised.', 'Track the status here.', SparklesSolid];
    case 'in-progress':
      return ['This feature is in progress.', 'Track the status here.', SparklesSolid];
    default:
      return ['This feature is coming soon.', 'You can follow it here.', SparklesSolid];
  }
};

interface ComingSoonProps {
  id: string;
  status: Status;
  size?: 'sm' | 'md';
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  status,
  id,
  size = 'md',
}: ComingSoonProps) => {
  const [statusText, linkText, Icon] = getStuff(status);

  return (
    <div className={containerVariant({ size })}>
      <Icon className={iconVariant({ size })} />
      <div className={'flex flex-col gap-1 flex-wrap items-start'}>
        <p className={textVariant({ size })}>{statusText as string}</p>
        <Link className={linkVariant({ size })} href={`/meta/features/${id}`}>
          {linkText as string}
        </Link>
      </div>
    </div>
  );
};
