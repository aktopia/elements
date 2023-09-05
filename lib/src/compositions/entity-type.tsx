import { useTranslation } from '@elements/translation';
import { cva } from 'cva';
import { EntityType as Type } from '@elements/types';

const entityTypeTranslation = {
  [Type.Issue]: 'common/issue',
  [Type.Action]: 'common/action',
};

const containerVariant = cva('w-max rounded', {
  variants: {
    type: {
      [Type.Issue]: 'bg-rose-50 border border-rose-200',
      [Type.Action]: 'bg-blue-50 border border-blue-200',
    },
    size: {
      sm: 'px-3 py-1',
      xs: 'px-1 py-0.5',
    },
  },
});

const textVariant = cva('text-xs', {
  variants: {
    type: {
      [Type.Issue]: 'text-rose-600',
      [Type.Action]: 'text-blue-600',
    },
    size: {
      sm: 'font-medium',
      xs: 'font-normal',
    },
  },
});

interface EntityTypeProps {
  type: Type;
  size: 'xs' | 'sm';
}

export const EntityType = ({ type, size = 'sm' }: EntityTypeProps) => {
  const t = useTranslation();
  return (
    <div className={containerVariant({ type, size })}>
      <p className={textVariant({ type, size })}>{t(entityTypeTranslation[type])}</p>
    </div>
  );
};
