import { ComingSoon } from '@elements/components/coming-soon';
import { Dialog, DialogTrigger, Popover } from 'react-aria-components';
import type { ReactNode } from 'react';
import { cx } from '@elements/utils';
import type { Status } from '@elements/logic/meta/initiative';

export const WrapComingSoonPopover = ({
  id,
  status,
  size,
  children,
}: {
  id: string;
  status: Status;
  size?: 'sm' | 'md';
  children: ReactNode;
}) => {
  return (
    <DialogTrigger>
      {children}
      <Popover>
        <Dialog
          className={cx(
            'z-tooltip bg-white border border-gray-300 shadow-lg rounded-lg focus:outline-none focus:ring-0',
            size === 'sm' ? 'py-1.5 px-2' : 'p-3'
          )}>
          <ComingSoon size={size} slug={id} status={status} />
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
