import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

export const RawDropdown = RadixDropdownMenu.Root;

export const RawDropdownTrigger = ({ children }: { children: ReactNode }) => {
  return <RadixDropdownMenu.Trigger asChild={true}>{children}</RadixDropdownMenu.Trigger>;
};

export const RawDropdownPanel = ({ children, gap }: { children: ReactNode; gap?: number }) => {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content sideOffset={gap}>{children}</RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
};

export const RawDropdownArrow = RadixDropdownMenu.Arrow;

export const RawDropdownItem = ({ children }: { children: ReactNode }) => {
  return <RadixDropdownMenu.Item asChild={true}>{children}</RadixDropdownMenu.Item>;
};
