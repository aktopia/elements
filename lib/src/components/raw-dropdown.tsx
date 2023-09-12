import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';

export const RawDropdown = RadixDropdownMenu.Root;

export const RawDropdownTrigger = ({ children }: { children: ReactNode }) => {
  return <RadixDropdownMenu.Trigger asChild={true}>{children}</RadixDropdownMenu.Trigger>;
};

export const RawDropdownPanel = ({
  children,
  sideOffset,
}: {
  children: ReactNode;
  sideOffset?: number;
}) => {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content asChild sideOffset={sideOffset}>
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
};

export const RawDropdownArrow = RadixDropdownMenu.Arrow;

export const RawDropdownItem = ({ children }: { children: ReactNode }) => {
  return <RadixDropdownMenu.Item asChild={true}>{children}</RadixDropdownMenu.Item>;
};
