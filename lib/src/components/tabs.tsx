import type { VariantProps } from 'cva';
import { cva } from 'cva';
import { memo, useCallback } from 'react';

const containerVariant = cva('flex overflow-x-scroll', {
  variants: {
    size: {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-6',
      lg: 'gap-10',
    },
  },
});

const tabVariant = cva(
  'flex cursor-pointer items-center justify-center ease-out transition-all default-focus',
  {
    variants: {
      size: {
        xs: 'px-1.5 py-1 rounded-md',
        sm: 'px-2 py-1 font-medium rounded-md',
        md: 'px-5 py-2.5 text-base font-medium rounded-md',
        lg: 'px-5 py-2.5 text-lg font-medium rounded-md',
      },
      status: {
        active: 'text-gray-800 shadow-inner bg-gray-100 border border-gray-300',
        inactive: 'text-gray-500 hover:text-gray-800',
      },
    },
  }
);

type ContainerVariant = VariantProps<typeof containerVariant>;

export interface Tab {
  id: string;
  label: string;
  badge?: string;
}

interface TabsProps extends ContainerVariant {
  tabs: Tab[];
  activeTabId: Tab['id'];
  onTabClick: Function;
}

interface TabProps {
  id: string;
  label: string;
  status: 'active' | 'inactive';
  size: any;
  onTabClick: Function;
}

const Tab = ({ id, label, status, size, onTabClick }: TabProps) => {
  const onClick = useCallback(() => onTabClick(id), [id, onTabClick]);
  return (
    <button key={id} className={tabVariant({ status, size })} type={'button'} onClick={onClick}>
      {label}
    </button>
  );
};

export const Tabs = memo(({ activeTabId, tabs, size, onTabClick }: TabsProps) => {
  return (
    <div className={containerVariant({ size })}>
      {tabs.map(({ id, label }: any) => {
        const status = id == activeTabId ? 'active' : 'inactive';

        return (
          <Tab key={id} id={id} label={label} size={size} status={status} onTabClick={onTabClick} />
        );
      })}
    </div>
  );
});
