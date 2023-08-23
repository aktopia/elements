import React from 'react';
import {
  RawDropdown,
  RawDropdownItem,
  RawDropdownPanel,
  RawDropdownTrigger,
} from '@elements/components/raw-dropdown';
import { cx } from 'cva';

interface ItemProps {
  text: string;
  kind: 'normal' | 'danger';
  href?: string;
  openNewTab?: boolean;
  Icon?: React.ComponentType<{
    className: string;
  }>;
  onClick?: () => void;
}

export const Item = ({ text, href, Icon, onClick, kind = 'normal' }: ItemProps) => {
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
      <div
        className={
          'group my-1 flex w-full cursor-default items-center bg-white hover:bg-gray-100 focus:outline-none'
        }>
        {href ? (
          <div className={'flex items-center gap-2 px-4 py-2'}>
            <a className={'hover:underline'} href={href} rel={'noreferrer'}>
              {body}
            </a>
          </div>
        ) : (
          <button
            className={
              'flex w-full items-center justify-items-start gap-2 bg-white px-4 py-2 group-hover:bg-gray-100'
            }
            type={'button'}
            onClick={onClick}>
            {body}
          </button>
        )}
      </div>
    </RawDropdownItem>
  );
};

export const Dropdown = ({ Button, items }: any) => {
  return (
    <RawDropdown>
      <RawDropdownTrigger>
        <div className={'outline-none'}>
          <Button />
        </div>
      </RawDropdownTrigger>
      <RawDropdownPanel gap={5}>
        <div
          className={
            'w-max overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none'
          }>
          {items.map((item: ItemProps) => (
            <Item key={item.text} {...item} />
          ))}
        </div>
      </RawDropdownPanel>
    </RawDropdown>
  );
};
