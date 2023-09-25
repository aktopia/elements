import {
  EllipsisHorizontalOutline,
  PencilOutline,
  TrashOutline,
  UserCircleSolid,
} from '@elements/icons';
import { ConfirmationModal } from '@elements/components/confirmation-modal';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { Timestamp } from '@elements/components/timestamp';
import { Voting } from '@elements/compositions/voting';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { Dropdown } from '@elements/components/dropdown';

const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

interface DeleteConfirmationModalProps {
  refId: string;
  refAttribute: string;
}

const DeleteConfirmationModal = suspensify(
  ({ refId, refAttribute }: DeleteConfirmationModalProps) => {
    const t = useTranslation();
    const reference = useMemo(
      () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
      [refId, refAttribute]
    );
    const id = useValue('update.deletion/id');

    const cancelDeletion = useDispatch('update.deletion/cancel');
    const deleteUpdate = useDispatch('update/delete');

    const onClose = useCallback(() => cancelDeletion({ 'update/id': id }), [cancelDeletion, id]);
    const onDelete = useCallback(
      () => deleteUpdate({ 'update/id': id, ...reference }),
      [deleteUpdate, id, reference]
    );

    return (
      <ConfirmationModal
        bodyText={t('update.delete.modal/body')}
        cancelText={t('common/cancel')}
        confirmText={t('common/delete')}
        kind={'danger'}
        titleText={t('update.delete.modal/title')}
        visible={!!id}
        onClose={onClose}
        onConfirm={onDelete}
      />
    );
  }
);

const ContextMenuButton = () => {
  return <EllipsisHorizontalOutline className={'h-6 w-6 cursor-pointer text-gray-700'} />;
};

const ContextMenu = ({ id }: { id: string }) => {
  const t = useTranslation();

  const startDeletion = useDispatch('update.deletion/start');
  const edit = useDispatch('update.text/edit');

  const onDeleteClick = useCallback(() => startDeletion({ 'update/id': id }), [id, startDeletion]);
  const onEditClick = useCallback(() => edit({ 'update/id': id }), [id, edit]);

  const items = useMemo(
    () => [
      { text: t('common/edit'), onClick: onEditClick, Icon: PencilOutline },
      { text: t('common/delete'), onClick: onDeleteClick, Icon: TrashOutline, kind: 'danger' },
    ],
    [t, onEditClick, onDeleteClick]
  );

  return <Dropdown button={<ContextMenuButton />} items={items} />;
};

const Update = suspensify(({ id }: { id: string }) => {
  const creatorName = useValue('update/creator-name', { 'update/id': id });
  const text = useValue('update/text', { 'update/id': id });
  const createdAt = useValue('update/created-at', { 'update/id': id });

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
        <Voting refAttribute={'entity.type/update'} refId={id} size={'xs'} suspenseLines={2} />
        <ContextMenu id={id} />
      </div>
    </div>
  );
});

interface UpdatesProps {
  refId: string;
  refAttribute: string;
}

export const Updates = suspensify(({ refId, refAttribute }: UpdatesProps) => {
  const t = useTranslation();
  const reference = useMemo(
    () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
    [refId, refAttribute]
  );
  const currentUserName = useValue('current.user/name');
  const updateIds = useValue('update/ids', reference);

  const updateContent = useDispatch('new.update/update');
  const createContent = useDispatch('new.update/create');

  const onChange = useCallback(
    (value: string) => {
      updateContent({ ...reference, value });
    },
    [updateContent, reference]
  );

  const onPost = useCallback(() => {
    createContent(reference);
  }, [createContent, reference]);

  return (
    <div className={'flex flex-col gap-7'}>
      <NewContent
        creatorName={currentUserName}
        placeholderText={"Any updates that you'd like to share?"}
        postText={t('common/post')}
        onChange={onChange}
        onPost={onPost}
      />
      <div className={'w-full'}>
        {updateIds.map((id, idx) => (
          <div key={id} className={'w-full'}>
            {idx !== 0 && <div className={'my-2.5 ml-9 h-7 w-0.5 rounded bg-gray-300'} />}
            <Update id={id} suspenseLines={5} />
          </div>
        ))}
      </div>
      <DeleteConfirmationModal refAttribute={refAttribute} refId={refId} suspenseLines={3} />
    </div>
  );
});
