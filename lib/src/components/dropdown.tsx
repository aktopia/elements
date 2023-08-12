import { ArrowTopRightOnSquareOutline } from '@elements/icons';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface ItemProps {
  text: string;
  href?: string;
  openNewTab?: boolean;
  Icon?: React.ComponentType<{ className: string }>;
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
    <Menu.Item
      as={'div'}
      className={'ui-active:bg-gray-100 my-1 flex w-full cursor-default items-center bg-white'}>
      {href ? (
        <div className={'flex items-center'}>
          <a className={' hover:underline'} href={href} rel={'noreferrer'}>
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
          className={'ui-active:bg-gray-100 my-1 flex w-full items-center bg-white'}
          type={'button'}
          onClick={onClick}>
          {body}
        </button>
      )}
    </Menu.Item>
  );
};

export const Dropdown = ({ Button, items, align }: any) => {
  return (
    <Menu as={'div'} className={'relative'}>
      <Menu.Button className={'flex items-center'}>
        <Button />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter={'transition ease-out duration-100'}
        enterFrom={'transform opacity-0 scale-95'}
        enterTo={'transform opacity-100 scale-100'}
        leave={'transition ease-in duration-75'}
        leaveFrom={'transform opacity-100 scale-100'}
        leaveTo={'transform opacity-0 scale-95'}>
        <Menu.Items
          className={`${
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          } absolute z-10 mt-2 w-max overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          {items.map((item: ItemProps) => (
            <Item key={item.text} {...item} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
