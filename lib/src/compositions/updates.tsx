import { UserCircleSolid } from '@elements/_icons';
import { ConfirmationModal } from '@elements/components/confirmation-modal';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { Timestamp } from '@elements/components/timestamp';
import { ContextMenuItem } from '@elements/components/with-context-menu';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

const DeleteConfirmationModal = suspensify(() => {
  const t = useTranslation();
  const { id, 'in-progress': inProgress } = useValue<{ id: string; 'in-progress': boolean }>(
    'update.deletion/in-progress'
  );

  const cancelDeletion = useDispatch('update.deletion/cancel');
  const deleteUpdate = useDispatch('update/delete');

  const onClose = useCallback(() => cancelDeletion({ 'update/id': id }), [cancelDeletion, id]);
  const onDelete = useCallback(() => deleteUpdate({ 'update/id': id }), [deleteUpdate, id]);

  return (
    <ConfirmationModal
      bodyText={t('update.delete.modal/body')}
      cancelText={t('common/cancel')}
      confirmText={t('common/delete')}
      kind={'danger'}
      titleText={t('update.delete.modal/title')}
      visible={inProgress}
      onClose={onClose}
      onConfirm={onDelete}
    />
  );
});

const Update = suspensify(({ id }: { id: string }) => {
  const t = useTranslation();

  const creatorName = useValue<string>('update/creator-name', { 'update/id': id });
  const text = useValue<string>('update/text', { 'update/id': id });
  const createdAt = useValue<number>('update/created-at', { 'update/id': id });

  const startDeletion = useDispatch('update.deletion/start');

  const onDeleteClick = useCallback(() => startDeletion({ 'update/id': id }), [id, startDeletion]);

  const menuItems = useMemo(
    () => [
      <ContextMenuItem key={id} id={'delete'} label={t('common/delete')} onClick={onDeleteClick} />,
    ],
    [id, onDeleteClick, t]
  );

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex w-full items-center gap-5'}>
        <User name={creatorName} />
        <Timestamp className={'text-xs text-gray-400'} timestamp={createdAt} />
      </div>
      <TextEditor
        className={'text-gray-700'}
        content={text}
        moreMenuItems={menuItems}
        refAttribute={'update/text'}
        refId={id}
        suspense={{ lines: 4 }}
      />
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
  const currentUserId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': currentUserId });
  const updateIds = useValue<string[]>('update/ids-by-reference', reference);

  const updateContent = useDispatch('new.update/update');
  const postContent = useDispatch('new.update/post');

  const onChange = useCallback(
    (value: string) => {
      updateContent({ ...reference, value });
    },
    [updateContent, reference]
  );

  const onPost = useCallback(() => {
    postContent(reference);
  }, [postContent, reference]);

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
            <Update id={id} suspense={{ lines: 5 }} />
          </div>
        ))}
      </div>
      <DeleteConfirmationModal suspense={{ lines: 3 }} />
    </div>
  );
});
