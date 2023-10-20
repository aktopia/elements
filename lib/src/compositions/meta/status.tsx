import type { ItemProps } from 'react-aria-components';
import { Button, Item, ListBox, Popover, Select, SelectValue } from 'react-aria-components';
import { CheckSolid } from '@elements/icons';
import type { ReactNode } from 'react';
import { cx } from '@elements/utils';
import { useTranslation } from '@elements/translation';

const ListBoxItem = (props: ItemProps & { children: ReactNode }) => {
  return (
    <Item
      {...props}
      className={
        'group flex items-center justify-center gap-2 cursor-default py-2 px-4 outline-none rounded text-gray-700 focus:bg-gray-100'
      }>
      {({ isSelected }) => (
        <>
          <span className={'flex-1 flex items-center gap-2 truncate group-selected:font-medium'}>
            {props.children}
          </span>
          {isSelected && <CheckSolid className={'h-4 w-4 text-gray-600'} />}
        </>
      )}
    </Item>
  );
};

export const StatusSelect = ({ statuses, onSelectionChange, selected }: any) => {
  const t = useTranslation();
  return (
    <Select
      aria-labelledby={'initiative-status'}
      className={'flex flex-col gap-4'}
      selectedKey={selected}
      onSelectionChange={onSelectionChange}>
      <Button
        className={
          'flex items-center justify-center border border-gray-300 transition py-1.5 px-3 text-base text-gray-700 focus:outline-none rounded-full'
        }>
        <SelectValue />
      </Button>
      <Popover
        className={
          'max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out'
        }>
        <ListBox className={'outline-none p-1'} items={statuses}>
          {(status: any) => (
            <ListBoxItem key={status.id} id={status.id} textValue={t(status.id)} value={status.id}>
              <span
                className={cx(
                  'w-3 h-3 rounded-full border border-solid border-white',
                  status.color
                )}
              />
              <span>{t(status.id)}</span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};
