import { useTranslation } from '@elements/translation';
import { cva } from 'cva';
import { EntityType as Type } from '@elements/types';

const entityTypeTranslation = {
  [Type.Issue]: 'common/issue',
  [Type.Action]: 'common/action',
  [Type.User]: 'common/user',
  [Type.MetaInitiative]: 'common/initiative',
};

const containerVariant = cva('w-max rounded', {
  variants: {
    type: {
      [Type.Issue]: 'bg-rose-50 border border-rose-200',
      [Type.Action]: 'bg-blue-50 border border-blue-200',
      [Type.User]: 'bg-teal-50 border border-teal-200',
      [Type.MetaInitiative]: 'bg-emerald-50 border border-emerald-200',
    },
    size: {
      sm: 'px-3 py-1',
      xs: 'px-1 py-0.5',
      md: 'px-4 py-2',
      lg: 'px-5 py-2.5',
    },
  },
});

const textVariant = cva('', {
  variants: {
    type: {
      [Type.Issue]: 'text-rose-600',
      [Type.Action]: 'text-blue-600',
      [Type.User]: 'text-teal-600',
      [Type.MetaInitiative]: 'text-emerald-600',
    },
    size: {
      sm: 'font-medium text-xs',
      xs: 'font-normal text-xs',
      md: 'font-medium text-base',
      lg: 'font-medium text-lg',
    },
  },
});

interface EntityTypeProps {
  type: Type;
  size: 'xs' | 'sm' | 'md' | 'lg';
}

export const EntityTypeBadge = ({ type, size = 'sm' }: EntityTypeProps) => {
  const t = useTranslation();
  return (
    <div className={containerVariant({ type, size })}>
      <p className={textVariant({ type, size })}>{t(entityTypeTranslation[type])}</p>
    </div>
  );
};
