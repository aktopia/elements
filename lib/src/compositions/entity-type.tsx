import { useTranslation } from '@elements/translation';
import { cva } from 'cva';

const entityTypeTranslation = {
  issue: 'common/issue',
  action: 'common/action',
};

const containerVariant = cva('w-max rounded border px-2 py-1', {
  variants: {
    type: {
      issue: 'border-rose-300 bg-rose-50',
      action: 'border-blue-300 bg-blue-50',
    },
  },
});

const textVariant = cva('text-xs font-medium', {
  variants: {
    type: {
      issue: 'text-rose-600',
      action: 'text-blue-600',
    },
  },
});

interface EntityTypeProps {
  type: 'issue' | 'action';
}

export const EntityType = ({ type }: EntityTypeProps) => {
  const t = useTranslation();
  return (
    <div className={containerVariant({ type })}>
      <p className={textVariant({ type })}>{t(entityTypeTranslation[type])}</p>
    </div>
  );
};
