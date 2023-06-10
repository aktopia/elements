import { NewComment } from '@elements/components/new-comment';
import { Comments } from '@elements/compositions/comment';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback } from 'react';

export const Discussion = () => {
  const t = useTranslation();

  const userId = useValue<string>('current.user/id');
  const authorName = useValue<string>('user/name', { 'user/id': userId });
  const actionId = useValue<string>('current.action/id');
  const ids = useValue<string[]>('action/comment-ids', { 'action/id': actionId });

  const newCommentChange = useDispatch('new.comment.text/update', { 'parent/id': actionId });
  const onNewCommentPost = useDispatch('new.comment/post', { 'parent/id': actionId });
  const onNewCommentChange = useCallback(
    (value: string) => {
      newCommentChange({ value });
    },
    [newCommentChange]
  );

  return (
    <div className={'flex flex-col gap-7'}>
      <NewComment
        authorName={authorName}
        placeholderText={t('comment/placeholder')}
        postText={t('common/post')}
        onChange={onNewCommentChange}
        onPost={onNewCommentPost}
      />
      <Comments ids={ids} />
    </div>
  );
};
