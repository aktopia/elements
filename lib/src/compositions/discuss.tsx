import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback } from 'react';
import { Comments } from '@elements/compositions/comments';
import { ConfirmationModal } from '@elements/components/confirmation-modal';
import { useWrapRequireAuth } from '@elements/store/hooks';
import type { Ident } from '@elements/types';

interface DiscussProps {
  lookupRef: Ident;
}

const DeleteConfirmationModal = suspensify(() => {
  const t = useTranslation();
  const id = useValue('comment.deletion/id');

  const cancelDeletion = useDispatch('comment.deletion/cancel');
  const deleteComment = useDispatch('comment/delete');

  const onClose = useCallback(() => cancelDeletion({ 'comment/id': id }), [cancelDeletion, id]);
  const onDelete = useCallback(() => deleteComment({ 'comment/id': id }), [deleteComment, id]);

  return (
    <ConfirmationModal
      bodyText={t('comment.delete.modal/body')}
      cancelText={t('common/cancel')}
      confirmText={t('common/delete')}
      kind={'danger'}
      titleText={t('comment.delete.modal/title')}
      visible={!!id}
      onClose={onClose}
      onConfirm={onDelete}
    />
  );
});

export const Discuss = suspensify(({ lookupRef }: DiscussProps) => {
  const t = useTranslation();
  const currentUserName = useValue('current.user/name');

  const commentIds = useValue('comment/ids', { ref: lookupRef });
  const newCommentError = useValue('new.comment/error', { ref: lookupRef });

  const updateNewComment = useDispatch('new.comment/update');
  const postNewComment = useDispatch('new.comment/create');

  const onNewCommentChange = useCallback(
    (value: string) => {
      updateNewComment({ ref: lookupRef, value });
    },
    [updateNewComment, lookupRef]
  );

  const onNewCommentPost = useWrapRequireAuth(() => {
    postNewComment({ ref: lookupRef });
  }, [postNewComment, lookupRef]);

  const authorName = currentUserName || t('common/you');

  return (
    <>
      <div className={'flex flex-col gap-7'}>
        <NewContent
          creatorName={authorName}
          error={newCommentError}
          placeholderText={t('comment/placeholder')}
          postText={t('common/post')}
          onChange={onNewCommentChange}
          onPost={onNewCommentPost}
        />
        <Comments ids={commentIds} suspenseLines={8} />
      </div>
      <DeleteConfirmationModal suspenseLines={2} />
    </>
  );
});

/*
TODO
- Make this generic to be used with any parent type
- Proper suspense lines for this, comments and comment
 */
