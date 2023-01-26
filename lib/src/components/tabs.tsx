import { cva, VariantProps } from 'cva';
import React, { useCallback } from 'react';

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

interface TabProps {
  id: string;
  label: string;
  status: 'active' | 'inactive';
  size: any;
  onTabClick: Function;
}

function Tab({ id, label, status, size, onTabClick }: TabProps) {
  const onClick = useCallback(() => onTabClick(id), [id, onTabClick]);
  return <div key={id} className={tabVariant({ status, size })} onClick={onClick}>
    {label}
  </div>;
}

export const Tabs = React.memo(({ activeTabId, tabs, size, onTabClick }: TabsProps) => {
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
