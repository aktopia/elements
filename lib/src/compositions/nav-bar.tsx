import { ChevronDownMiniSolid, UserCircleSolid } from '@elements/_icons';
import { Dropdown } from '@elements/components/menu';
import { useRef } from 'react';

const CreateButton = () => {
  return (
    <div className={'flex cursor-pointer items-start gap-4'}>
      <div
        className={
          'relative flex items-center justify-center gap-1 overflow-hidden rounded-md bg-blue-600 py-2 pl-3 pr-2'
        }>
        <p className={'text-xs font-medium text-white'}>{'Create'}</p>
        <ChevronDownMiniSolid className={'h-4 w-4 text-white'} />
      </div>
    </div>
  );
};

const items = [
  {
    text: 'Action',
  },
];
const CreateMenu = () => {
  return <Dropdown Button={CreateButton} items={items} />;
};

const Avatar = () => {
  return (
    <div className={'flex items-center gap-2'}>
      <UserCircleSolid className={'h-8 w-8 text-gray-600'} />
      <ChevronDownMiniSolid className={'h-4 w-4 text-gray-600'} />
    </div>
  );
};

const UserMenu = () => {
  const items = useRef([{ text: 'My Actions' }]);
  return <Dropdown Button={Avatar} align={'right'} items={items.current} />;
};

export const NavBar = () => {
  return (
    <div
      className={
        'flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm'
      }>
      <CreateMenu />
      <UserMenu />
    </div>
  );
};
