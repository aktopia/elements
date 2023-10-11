import {
  RawDropdown,
  RawDropdownItem,
  RawDropdownPanel,
  RawDropdownSeparator,
  RawDropdownTrigger,
} from '@elements/components/raw-dropdown';
import { cx } from '@elements/utils';
import type { ComponentType, ReactNode } from 'react';
import type { Kind } from '@elements/components/button';
import { Link } from '@elements/components/link';

export interface ItemType {
  type: 'link' | 'button' | 'separator';
  text: string;
  kind: Kind;
  key: string;
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
        <Link
          className={
            'flex w-full items-center justify-items-start gap-2 rounded-md bg-white px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 hover:underline'
          }
          href={href}
          rel={'noreferrer'}>
          {body}
        </Link>
      ) : (
        <button
          className={
            'flex w-full items-center justify-items-start gap-2 rounded-md bg-white px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
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
  items: Array<ItemType>;
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
          {items.map((item: ItemType) => {
            if (item.type === 'separator') {
              return (
                <RawDropdownSeparator
                  key={item.key}
                  className={'h-px w-full bg-gray-200 rounded-full my-1'}
                />
              );
            }
            return <Item {...item} key={item.key} />;
          })}
        </div>
      </RawDropdownPanel>
    </RawDropdown>
  );
};
