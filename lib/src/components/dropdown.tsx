import { ArrowTopRightOnSquareOutline } from '@elements/icons';
import React from 'react';
import {
  RawDropdown,
  RawDropdownArrow,
  RawDropdownItem,
  RawDropdownPanel,
  RawDropdownTrigger,
} from '@elements/components/raw-dropdown';

interface ItemProps {
  text: string;
  href?: string;
  openNewTab?: boolean;
  Icon?: React.ComponentType<{
    className: string;
  }>;
  onClick?: () => void;
}

export const Item = ({ text, href, Icon, onClick }: ItemProps) => {
  const body = (
    <>
      {Icon && <Icon className={'mr-3 h-5 w-5 text-gray-700'} />}
      <div className={'rounded px-3 py-2 text-xs font-medium text-gray-700'}>{text}</div>
    </>
  );

  return (
    <RawDropdownItem>
      <div
        className={
          'group my-1 flex w-full cursor-default items-center bg-white hover:bg-gray-100 focus:outline-none'
        }>
        {href ? (
          <div className={'flex items-center'}>
            <a className={'hover:underline'} href={href} rel={'noreferrer'}>
              {body}
            </a>
            <a className={'pr-2'} href={href} rel={'noreferrer'} target={'_blank'}>
              <ArrowTopRightOnSquareOutline
                className={'h-3.5 w-3.5 stroke-2 text-gray-400 hover:text-gray-700'}
              />
            </a>
          </div>
        ) : (
          <button
            className={'flex w-full items-center bg-white group-hover:bg-gray-100'}
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
        <RawDropdownArrow className={'fill-white'} />
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
