import {
  ChatBubbleLeftEllipsisOutline,
  ChevronDownMiniSolid,
  ChevronUpMiniSolid,
  TrashOutline,
  UserCircleSolid,
} from '@elements/icons';
import { Button } from '@elements/components/button';
import { ConfirmationModal } from '@elements/components/confirmation-modal';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { Timestamp } from '@elements/components/timestamp';
import { ContextMenuItem } from '@elements/components/with-context-menu';
import { TextEditor } from '@elements/compositions/text-editor';
import { Voting } from '@elements/compositions/voting';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { isEmpty } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

export const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

const DeletedComment = () => {
  const t = useTranslation();

  return (
    <div className={'flex items-center gap-3'}>
      <TrashOutline className={'h-4 w-4 text-gray-500'} />
      <p className={'text-sm text-gray-500'}>{t('comment/deleted')}</p>
    </div>
  );
};

const DeleteConfirmationModal = suspensify(() => {
  const t = useTranslation();
  const { id, 'in-progress': inProgress } = useValue<{ id: string; 'in-progress': boolean }>(
    'comment.deletion/in-progress'
  );

  const cancelDeletion = useDispatch('comment.deletion/cancel');
  const deleteUpdate = useDispatch('comment/delete');

  const onClose = useCallback(() => cancelDeletion({ 'comment/id': id }), [cancelDeletion, id]);
  const onDelete = useCallback(() => deleteUpdate({ 'comment/id': id }), [deleteUpdate, id]);

  return (
    <ConfirmationModal
      bodyText={t('comment.delete.modal/body')}
      cancelText={t('common/cancel')}
      confirmText={t('common/delete')}
      kind={'danger'}
      titleText={t('comment.delete.modal/title')}
      visible={inProgress}
      onClose={onClose}
      onConfirm={onDelete}
    />
  );
});

const ExpandCollapseButton = ({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) => {
  return expanded ? (
    <ChevronUpMiniSolid className={'h-4 w-4 cursor-pointer text-gray-700'} onClick={onClick} />
  ) : (
    <ChevronDownMiniSolid className={'h-4 w-4 cursor-pointer text-gray-700'} onClick={onClick} />
  );
};

export const Comment = suspensify(({ id }: { id: string }) => {
  const t = useTranslation();
  const reference = useMemo(() => ({ 'ref/id': id, 'ref/attribute': 'entity.type/comment' }), [id]);

  const currentUserId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': currentUserId });
  const creatorName = useValue<string>('comment/creator-name', { 'comment/id': id });
  const status = useValue<string>('comment/status', { 'comment/id': id });
  const text = useValue<string>('comment/text', { 'comment/id': id });
  const createdAt = useValue<number>('comment/created-at', { 'comment/id': id });
  const responseIds = useValue<string[]>('comment/ids-by-reference', reference);
  const deleted = status === 'deleted';

  const updateNewComment = useDispatch('new.comment/update');
  const postNewComment = useDispatch('new.comment/post');
  const startDeletion = useDispatch('comment.deletion/start');

  const [expanded, setExpanded] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  const onExpandCollapse = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const onToggleReply = useCallback(() => {
    setIsReplying(!isReplying);
  }, [isReplying]);

  const onNewCommentUpdate = useCallback(
    (value: string) => {
      updateNewComment({ ...reference, value });
    },
    [reference, updateNewComment]
  );

  const onNewCommentPost = useCallback(() => {
    postNewComment(reference);
    setIsReplying(false);
  }, [reference, postNewComment]);

  const onDeleteClick = useCallback(() => startDeletion({ 'comment/id': id }), [id, startDeletion]);

  const menuItems = useMemo(
    () => [
      <ContextMenuItem key={id} id={'delete'} label={t('common/delete')} onClick={onDeleteClick} />,
    ],
    [id, onDeleteClick, t]
  );

  const showResponses = expanded && responseIds && !isEmpty(responseIds);

  return (
    <div
      className={
        'flex flex-col gap-4 rounded-lg border-b border-l border-gray-300 bg-white p-4 hover:border-gray-400'
      }>
      {deleted ? (
        <DeletedComment />
      ) : (
        <div className={'flex flex-col gap-3'}>
          <div className={'flex items-center justify-between'}>
            <div className={'flex items-center gap-5'}>
              <User name={creatorName} />
              <Timestamp className={'text-xs text-gray-500'} timestamp={createdAt} />
            </div>
            <ExpandCollapseButton expanded={expanded} onClick={onExpandCollapse} />
          </div>
          {expanded && (
            <>
              <TextEditor
                className={'text-base text-gray-700'}
                content={text}
                moreMenuItems={menuItems}
                refAttribute={'comment/text'}
                refId={id}
                suspenseLines={2}
              />
              <div className={'flex gap-5'}>
                <Voting
                  refAttribute={'entity.type/comment'}
                  refId={id}
                  size={'xs'}
                  suspenseLines={1}
                />
                <Button
                  Icon={ChatBubbleLeftEllipsisOutline}
                  clicked={isReplying}
                  kind={'tertiary'}
                  size={'xxs'}
                  value={t('common/reply')}
                  onClick={onToggleReply}
                />
              </div>
            </>
          )}
        </div>
      )}
      {isReplying && (
        <NewContent
          cancelText={t('common/cancel')}
          creatorName={currentUserName}
          placeholderText={t('comment/placeholder')}
          postText={t('common/post')}
          onCancel={onToggleReply}
          onChange={onNewCommentUpdate}
          onPost={onNewCommentPost}
        />
      )}
      {showResponses && <Comments ids={responseIds} suspenseLines={8} />}
    </div>
  );
});

export const Comments = suspensify(({ ids }: { ids: string[] }) => {
  return (
    <div className={'flex flex-col gap-7'}>
      {ids.map((id) => {
        return <Comment key={id} id={id} suspenseLines={2} />;
      })}
      <DeleteConfirmationModal suspenseLines={2} />
    </div>
  );
});
/*
 TODO
 - Add transitions for a smoother animation
 - Expand collapse by clicking comment header
 - Avatar url
 */
