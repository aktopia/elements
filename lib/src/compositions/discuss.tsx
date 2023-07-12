import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { Comments } from '@elements/compositions/comments';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

interface DiscussProps {
  refId: string;
  refAttribute: string;
}

export const Discuss = suspensify(({ refId, refAttribute }: DiscussProps) => {
  const t = useTranslation();

  const userId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': userId });
  const reference = useMemo(
    () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
    [refId, refAttribute]
  );
  const commentIds = useValue<string[]>('comment/ids-by-reference', reference);

  const updateNewComment = useDispatch('new.comment/update');
  const postNewComment = useDispatch('new.comment/post');

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
    <div className={'flex flex-col gap-7'}>
      <NewContent
        creatorName={authorName}
        placeholderText={t('comment/placeholder')}
        postText={t('common/post')}
        onChange={onNewCommentChange}
        onPost={onNewCommentPost}
      />
      <Comments ids={commentIds} suspense={{ lines: 8 }} />
    </div>
  );
});

/*
TODO
- Make this generic to be used with any parent type
- Proper suspense lines for this, comments and comment
 */
