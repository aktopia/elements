import {
  RawDropdown,
  RawDropdownItem,
  RawDropdownPanel,
  RawDropdownTrigger,
} from '@elements/components/raw-dropdown';
import { cx } from '@elements/utils';
import type { ComponentType, ReactNode } from 'react';
import type { Kind } from '@elements/components/button';

export interface ItemType {
  text: string;
  kind: Kind;
  href?: string;
  openNewTab?: boolean;
  Icon?: ComponentType<{
    className: string;
  }>;
  onClick?: () => void;
}

export const Item = ({ text, href, Icon, onClick, kind = 'primary' }: ItemType) => {
  const body = (
    <>
      {Icon && (
        <Icon
          className={cx('-ml-1 h-4 w-4', kind === 'danger' ? 'text-rose-700' : 'text-gray-700')}
        />
      )}
      <div
        className={cx(
          'text-xs font-medium',
          kind === 'danger' ? 'text-rose-700' : 'text-gray-700'
        )}>
        {text}
      </div>
    </>
  );

  return (
    <RawDropdownItem>
      {href ? (
        <div
          className={
            'flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:outline-none'
          }>
          <a className={'hover:underline'} href={href} rel={'noreferrer'}>
            {body}
          </a>
        </div>
      ) : (
        <button
          className={
            'flex w-full items-center justify-items-start gap-2 rounded-md bg-white px-4 py-2 hover:bg-gray-100 focus:outline-none'
          }
          type={'button'}
          onClick={onClick}>
          {body}
        </button>
      )}
    </RawDropdownItem>
  );
};

interface DropdownProps {
  button: ReactNode;
  items: ItemType[];
}

export const Dropdown = ({ button, items }: DropdownProps) => {
  return (
    <RawDropdown>
      <RawDropdownTrigger>
        <div className={'w-min outline-none'}>{button}</div>
      </RawDropdownTrigger>
      <RawDropdownPanel sideOffset={5}>
        <div
          className={
            'z-dropdown w-max overflow-hidden rounded-md bg-white p-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none'
          }>
          {items.map((item: ItemType) => (
            <Item key={item.text} {...item} />
          ))}
        </div>
      </RawDropdownPanel>
    </RawDropdown>
  );
};
