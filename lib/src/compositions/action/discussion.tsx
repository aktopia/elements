import { NewComment } from '@elements/components/new-comment';
import { suspensify } from '@elements/components/suspensify';
import { Comments } from '@elements/compositions/comment';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback } from 'react';

export const Discussion = suspensify(() => {
  const t = useTranslation();

  const userId = useValue<string>('current.user/id');
  const userName = useValue<string>('user/name', { 'user/id': userId });
  const actionId = useValue<string>('current.action/id');
  const ids = useValue<string[]>('comment/comments-by-parent-id', {
    'parent/id': actionId,
    'parent.id/identifier': 'action/id',
  });

  const updateNewComment = useDispatch('new.comment.text/update');
  const postNewComment = useDispatch('new.comment/post');

  const onNewCommentChange = useCallback(
    (value: string) => {
      updateNewComment({ 'parent/id': actionId, value });
    },
    [updateNewComment, actionId]
  );

  const onNewCommentPost = useCallback(() => {
    postNewComment({ 'parent/id': actionId, 'parent.id/identifier': 'action/id' });
  }, [postNewComment, actionId]);

  const authorName = userName || t('common/you');

  return (
    <div className={'flex flex-col gap-7'}>
      <NewComment
        authorName={authorName}
        placeholderText={t('comment/placeholder')}
        postText={t('common/post')}
        onChange={onNewCommentChange}
        onPost={onNewCommentPost}
      />
      <Comments ids={ids} suspenseLines={8} />
    </div>
  );
});

/*
TODO
- Make this generic to be used with any parent type
- Proper suspense lines for this, comments and comment
 */
