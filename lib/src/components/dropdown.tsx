import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export const Item = ({ text, Icon, onClick }: any) => {
  return (
    <Menu.Item as={Fragment}>
      <button
        className={'flex items-center justify-center py-0.5'}
        type={'button'}
        onClick={onClick}>
        {Icon && <Icon className={'ui-active:text-white mr-3 h-5 w-5 text-blue-500'} />}
        <div
          className={
            'ui-active:bg-gray-100 rounded bg-white px-3 py-2 text-xs font-medium text-gray-700'
          }>
          {text}
        </div>
      </button>
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
          } absolute z-10 mt-2 w-max divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          {items.map(({ text, Icon }: any) => (
            <Item key={text} Icon={Icon} text={text} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
