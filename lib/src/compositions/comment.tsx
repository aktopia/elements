import {
  ChatBubbleLeftEllipsisOutline,
  ChevronDownMiniSolid,
  ChevronUpMiniSolid,
  UserCircleSolid,
} from '@elements/_icons';
import { Button } from '@elements/components/button';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { TextEditor } from '@elements/compositions/text-editor';
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

export const Comment = suspensify(({ id }: { id: string }) => {
  const t = useTranslation();
  const reference = useMemo(() => ({ 'entity/id': id, 'entity/type': 'comment/id' }), [id]);

  const currentUserId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': currentUserId });
  const creatorName = useValue<string>('comment/creator-name', { 'comment/id': id });
  const content = useValue<string>('comment/content', { 'comment/id': id });
  const responseIds = useValue<string[]>('comments/ids-by-reference', reference);

  const updateNewComment = useDispatch('new.comment/update');
  const postNewComment = useDispatch('new.comment/post');

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

  const showResponses = expanded && responseIds && !isEmpty(responseIds);

  return (
    <div className={'flex flex-col gap-4 rounded-lg border-b border-l border-gray-300 p-4'}>
      <div className={'flex flex-col gap-3'}>
        <div className={'flex items-center justify-between'}>
          <User name={creatorName} />
          {expanded ? (
            <ChevronUpMiniSolid
              className={'h-4 w-4 cursor-pointer text-gray-700'}
              onClick={onExpandCollapse}
            />
          ) : (
            <ChevronDownMiniSolid
              className={'h-4 w-4 cursor-pointer text-gray-700'}
              onClick={onExpandCollapse}
            />
          )}
        </div>
        {expanded && (
          <>
            <TextEditor
              content={content}
              entityId={id}
              entityType={'entity/comment'}
              suspense={{ lines: 2 }}
            />
            <Button
              Icon={ChatBubbleLeftEllipsisOutline}
              clicked={isReplying}
              kind={'tertiary'}
              size={'xxs'}
              value={t('common/reply')}
              onClick={onToggleReply}
            />
          </>
        )}
      </div>
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
      {showResponses && <Comments ids={responseIds} suspense={{ lines: 8 }} />}
    </div>
  );
});

export const Comments = suspensify(({ ids }: { ids: string[] }) => {
  return (
    <>
      {ids.map((id) => {
        return <Comment key={id} id={id} suspense={{ lines: 2 }} />;
      })}
    </>
  );
});
/*
 TODO
 - Add transitions for a smoother animation
 - Expand collapse by clicking comment header
 - Avatar url
 */
