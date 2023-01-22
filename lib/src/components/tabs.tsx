import React from 'react';
import { cva, VariantProps } from 'cva';

const containerVariant = cva('flex', {
  variants: {
    size: {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-6',
    },
  },
});

const tabVariant = cva('flex cursor-pointer items-center justify-center ease-out transition-all', {
  variants: {
    size: {
      xs: 'px-1.5 py-1 rounded-md',
      sm: 'px-2 py-1 font-medium rounded-md',
      md: 'px-5 py-2.5 text-base font-medium rounded-md',
    },
    status: {
      active: 'text-gray-700 shadow-inner bg-gray-100',
      inactive: 'text-gray-500 hover:text-gray-700',
    },
  },
});

type ContainerVariant = VariantProps<typeof containerVariant>;

interface Tab {
  id: string;
  label: string;
  badge?: string;
}

interface TabsProps extends ContainerVariant {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: Function;
}

export const Tabs = React.memo(({ activeTabId, tabs, size, onTabClick }: TabsProps) => {
  return (
    <div className={containerVariant({ size })}>
      {tabs.map(({ id, label }: any) => {
        const status = id == activeTabId ? 'active' : 'inactive';

        return (
          <div key={id} onClick={() => onTabClick(id)} className={tabVariant({ status, size })}>
            {label}
          </div>
        );
      })}
    </div>
  );
});