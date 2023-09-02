import { useTranslation } from '@elements/translation';
import { cva } from 'cva';
import { EntityType as Type } from '@elements/types';

const entityTypeTranslation = {
  [Type.Issue]: 'common/issue',
  [Type.Action]: 'common/action',
};

const containerVariant = cva('w-max rounded px-3 py-1', {
  variants: {
    type: {
      [Type.Issue]: 'bg-rose-50 border border-rose-200',
      [Type.Action]: 'bg-blue-50 border border-blue-200',
    },
  },
});

const textVariant = cva('text-xs font-medium', {
  variants: {
    type: {
      [Type.Issue]: 'text-rose-600',
      [Type.Action]: 'text-blue-600',
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
