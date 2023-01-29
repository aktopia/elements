import { cva, VariantProps } from 'cva';
import { useCallback } from 'react';

const containerVariant = cva(
  'flex h-min w-max items-center justify-center gap-1 bg-gray-50 border border-gray-100',
  {
    variants: {
      size: {
        xs: 'p-0.5 text-xs gap-0.5 rounded-md',
        sm: 'p-1 text-xs gap-1 rounded-md',
        md: 'p-1 text-sm gap-1 rounded-lg',
      },
    },
  }
);

const switchVariant = cva(
  'flex cursor-pointer items-center justify-center ease-out transition-all',
  {
    variants: {
      size: {
        xs: 'px-1.5 py-1 rounded-md',
        sm: 'px-2 py-1 font-medium rounded-md',
        md: 'px-3 py-1.5 font-medium rounded-md',
      },
      status: {
        active: 'text-gray-600 shadow bg-white',
        inactive: 'text-gray-500 hover:text-gray-600 hover:bg-gray-100',
      },
    },
  }
);

type ContainerVariant = VariantProps<typeof containerVariant>;

type SwitchVariant = VariantProps<typeof switchVariant>;

interface SwitchProps {
  id: string;
  label: string;
}

interface NamedSwitchProps extends ContainerVariant {
  activeSwitchId: string;
  switches: SwitchProps[];
  onSwitchClick: Function;
}

interface SwitchProps extends SwitchVariant {
  id: string;
  onSwitchClick: Function;
  label: string;
}

function Switch({ id, status, size, onSwitchClick, label }: SwitchProps) {
  const onClick = useCallback(() => onSwitchClick(id), [id, onSwitchClick]);

  return (
    <div className={switchVariant({ status, size })} onClick={onClick}>
      {label}
    </div>
  );
}

export function NamedSwitch({ activeSwitchId, switches, onSwitchClick, size }: NamedSwitchProps) {
  return (
    <div className={containerVariant({ size })}>
      {switches.map(({ id, label }: any) => {
        const status = id == activeSwitchId ? 'active' : 'inactive';

        return (
          <Switch
            key={id}
            id={id}
            label={label}
            size={size}
            status={status}
            onSwitchClick={onSwitchClick}
          />
        );
      })}
    </div>
  );
}

/*
TODO
Transitions
 */
