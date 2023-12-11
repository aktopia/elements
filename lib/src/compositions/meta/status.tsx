import type { ListBoxItemProps } from 'react-aria-components';
import { Button, ListBoxItem, ListBox, Popover, Select, SelectValue } from 'react-aria-components';
import { CheckSolid } from '@elements/icons';
import type { ReactNode } from 'react';
import { cx } from '@elements/utils';
import { useTranslation } from '@elements/translation';
import { Status } from '@elements/logic/meta/initiative';
import { useDispatch, useValue } from '@elements/store';
import { useCallback, useMemo } from 'react';

const Item = (props: ListBoxItemProps & { children: ReactNode }) => {
  return (
    <ListBoxItem
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
    </ListBoxItem>
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
            <Item key={status.id} id={status.id} textValue={t(status.id)} value={status.id}>
              <span
                className={cx(
                  'w-3 h-3 rounded-full border border-solid border-white',
                  status.color
                )}
              />
              <span>{t(status.id)}</span>
            </Item>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};

const statusColors = {
  [Status.Evaluating]: 'bg-gray-500',
  [Status.Planning]: 'bg-yellow-500',
  [Status.Planned]: 'bg-lime-500',
  [Status.InProgress]: 'bg-green-500',
};

export const InitiativeStatus = ({ slug }: { slug: string }) => {
  const t = useTranslation();
  const status = useValue('meta.initiative/status', { 'meta.initiative/slug': slug });
  const canEdit = useValue('meta.initiative.status/can-edit', {
    'meta.initiative/slug': slug,
  });

  const updateStatus = useDispatch('meta.initiative.status/update');

  const onSelectionChange = useCallback(
    (status: Status) => {
      updateStatus({ status, 'meta.initiative/slug': slug });
    },
    [updateStatus, slug]
  );

  const statuses = useMemo(
    () =>
      [Status.Evaluating, Status.Planning, Status.Planned, Status.InProgress].map((status) => ({
        id: status,
        color: statusColors[status],
      })),
    []
  );

  return canEdit ? (
    <StatusSelect selected={status} statuses={statuses} onSelectionChange={onSelectionChange} />
  ) : (
    <div
      className={
        'flex items-center gap-2 cursor-default border border-gray-300 transition py-1.5 px-3 text-base text-gray-700 focus:outline-none rounded-full'
      }>
      <span
        className={cx(
          'w-3 h-3 rounded-full border border-solid border-white',
          statusColors[status]
        )}
      />
      <span>{t(status)}</span>
    </div>
  );
};

/*
TODO
This should be cleaned up
 */
