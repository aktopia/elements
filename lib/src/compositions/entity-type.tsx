import { useTranslation } from '@elements/translation';
import { cva } from 'cva';
import { EntityType as Type } from '@elements/types';

const entityTypeTranslation = {
  [Type.issue]: 'common/issue',
  [Type.action]: 'common/action',
};

const containerVariant = cva('w-max rounded px-3 py-1', {
  variants: {
    type: {
      [Type.issue]: 'bg-rose-50 border border-rose-200',
      [Type.action]: 'bg-blue-50 border border-blue-200',
    },
  },
});

const textVariant = cva('text-xs font-medium', {
  variants: {
    type: {
      [Type.issue]: 'text-rose-600',
      [Type.action]: 'text-blue-600',
    },
  },
});

interface EntityTypeProps {
  type: Type;
}

export const EntityType = ({ type }: EntityTypeProps) => {
  const t = useTranslation();
  return (
    <div className={containerVariant({ type })}>
      <p className={textVariant({ type })}>{t(entityTypeTranslation[type])}</p>
    </div>
  );
};
