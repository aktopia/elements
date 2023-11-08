import { PencilOutline, TrashOutline, UserCircleSolid } from '@elements/icons';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { Timestamp } from '@elements/components/timestamp';
import { Voting } from '@elements/compositions/voting';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { type ItemType } from '@elements/components/dropdown';
import { ContextMenu as RawContextMenu } from '@elements/components/context-menu';
import type { LookupRef } from '@elements/types';
import { useLookupRef, useWrapRequireAuth } from '@elements/store/hooks';

const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

const ContextMenu = suspensify(
  ({ id, parentLookupRef }: { id: string; parentLookupRef: LookupRef }) => {
    // TODO Maybe do not even build this component if the user cannot edit or delete
    const t = useTranslation();

    const lookupRef = useLookupRef('update/id', id);
    const canEdit = useValue('update/can-update', { ref: lookupRef });
    const canDelete = useValue('update/can-delete', { ref: lookupRef });

    const edit = useDispatch('update.text/edit');

    const onEditClick = useCallback(() => edit({ 'update/id': id }), [id, edit]);
    const openModal = useDispatch('confirmation-modal/open');
    const deleteUpdate = useDispatch('update/delete');

    const onDeleteClick = useCallback(() => {
      const onConfirm = async () => deleteUpdate({ 'update/id': id, ref: parentLookupRef });
      openModal({
        kind: 'danger',
        confirmText: t('common/delete'),
        titleText: t('update.delete.modal/title'),
        bodyText: t('update.delete.modal/body'),
        cancelText: t('common/cancel'),
        onConfirm,
      });
    }, [openModal, t, deleteUpdate, id, parentLookupRef]);

    const items = useMemo(() => {
      let items = [];
      if (canEdit) {
        items.push({
          text: t('common/edit'),
          onClick: onEditClick,
          Icon: PencilOutline,
          key: 'edit',
          type: 'button',
        });
      }

      if (canDelete) {
        items.push({
          text: t('common/delete'),
          onClick: onDeleteClick,
          Icon: TrashOutline,
          kind: 'danger',
          key: 'delete',
          type: 'button',
        });
      }

      return items;
    }, [t, onEditClick, onDeleteClick, canDelete, canEdit]) as ItemType[];

    return items.length === 0 ? null : <RawContextMenu items={items} orientation={'horizontal'} />;
  }
);

const Update = suspensify(({ id, parentLookupRef }: { id: string; parentLookupRef: LookupRef }) => {
  const creatorName = useValue('update.created-by/name', { 'update/id': id });
  const text = useValue('update/text', { 'update/id': id });
  const createdAt = useValue('update/created-at', { 'update/id': id });
  const updateLookupRef = useLookupRef('update/id', id);

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex w-full items-center gap-5'}>
        <User name={creatorName} />
        <Timestamp className={'text-xs text-gray-500'} timestamp={createdAt} />
      </div>
      <TextEditor
        className={'text-gray-700'}
        content={text}
        refAttribute={'update/text'}
        refId={id}
        richText={false}
        suspenseLines={4}
      />
      <div className={'flex items-center gap-5'}>
        <Voting lookupRef={updateLookupRef} size={'xs'} suspenseLines={2} />
        <ContextMenu id={id} parentLookupRef={parentLookupRef} />
      </div>
    </div>
  );
});

interface UpdatesProps {
  lookupRef: LookupRef;
}

export const Updates = suspensify(({ lookupRef }: UpdatesProps) => {
  const t = useTranslation();
  const currentUserName = useValue('current.user/name');
  const updateIds = useValue('update/ids', { ref: lookupRef });
  const canCreate = useValue('update/can-create', { ref: lookupRef });
  const newUpdateError = useValue('new.update/error');

  const updateContent = useDispatch('new.update/update');
  const createContent = useDispatch('new.update/create');

  const onChange = useCallback(
    (value: string) => {
      updateContent({ ref: lookupRef, value });
    },
    [updateContent, lookupRef]
  );

  const onPost = useWrapRequireAuth(() => {
    createContent({ ref: lookupRef });
  }, [createContent, lookupRef]);

  return (
    <div className={'flex flex-col gap-7'}>
      {canCreate ? (
        <NewContent
          creatorName={currentUserName}
          error={newUpdateError}
          placeholderText={"Any updates that you'd like to share?"}
          postText={t('common/post')}
          onChange={onChange}
          onPost={onPost}
        />
      ) : null}
      <div className={'w-full'}>
        {updateIds.map((id, idx) => (
          <div key={id} className={'w-full'}>
            {idx !== 0 && <div className={'my-2.5 ml-9 h-7 w-0.5 rounded bg-gray-300'} />}
            <Update id={id} parentLookupRef={lookupRef} suspenseLines={5} />
          </div>
        ))}
      </div>
    </div>
  );
});
