import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { Comments } from '@elements/compositions/comments';
import { ConfirmationModal } from '@elements/components/confirmation-modal';

interface DiscussProps {
  refId: string;
  refAttribute: string;
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

export const Discuss = suspensify(({ refId, refAttribute }: DiscussProps) => {
  const t = useTranslation();

  const userId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': userId });
  const reference = useMemo(
    () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
    [refId, refAttribute]
  );
  const commentIds = useValue('comment/ids', reference);

  const updateNewComment = useDispatch('new.comment/update');
  const postNewComment = useDispatch('new.comment/create');

  const onNewCommentChange = useCallback(
    (value: string) => {
      updateNewComment({ ...reference, value });
    },
    [updateNewComment, reference]
  );

  const onNewCommentPost = useCallback(() => {
    postNewComment(reference);
  }, [postNewComment, reference]);

  const authorName = currentUserName || t('common/you');

  return (
    <>
      <div className={'flex flex-col gap-7'}>
        <NewContent
          creatorName={authorName}
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
