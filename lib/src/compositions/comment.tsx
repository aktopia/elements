import {
  ChatBubbleLeftEllipsisOutline,
  ChevronDownMiniSolid,
  ChevronUpMiniSolid,
  UserCircleSolid,
} from '@elements/_icons';
import { Button } from '@elements/components/button';
import { NewComment } from '@elements/components/new-comment';
import { suspensify } from '@elements/components/suspensify';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import { WithContextMenu } from '@elements/components/with-context-menu';
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

  const userId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': userId });
  const authorName = useValue<string>('comment/author-name', { 'comment/id': id });
  const commentText = useValue<string>('comment/text', { 'comment/id': id });
  const responseIds = useValue<string[]>('comment/comments-by-parent-id', {
    'parent/id': id,
    'parent.id/identifier': 'comment/id',
  });
  const canEdit = useValue<boolean>('comment/can-edit', {
    'comment/id': id,
    'user/id': userId,
  });

  const onEditDone = useDispatch('ui.comment.edit/done');
  const onEditCancel = useDispatch('ui.comment.edit/cancel');
  const onUpdate = useDispatch('inter.comment.text/update');

  const updateNewComment = useDispatch('new.comment.text/update');
  const postNewComment = useDispatch('new.comment/post');

  const [expanded, setExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const onExpandCollapse = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const onToggleReply = useCallback(() => {
    setIsReplying(!isReplying);
  }, [isReplying]);

  const onEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancel = useCallback(() => {
    onEditCancel({ 'comment/id': id });
    setIsEditing(false);
  }, [id, onEditCancel]);

  const onDone = useCallback(() => {
    onEditDone({ 'comment/id': id });
    setIsEditing(false);
  }, [id, onEditDone]);

  const onChange = useCallback(
    (value: string) => {
      onUpdate({ 'comment/id': id, value });
    },
    [id, onUpdate]
  );

  const onNewCommentUpdate = useCallback(
    (value: string) => {
      updateNewComment({ 'parent/id': id, value });
    },
    [id, updateNewComment]
  );

  const onNewCommentPost = useCallback(() => {
    postNewComment({ 'parent/id': id, 'parent.id/identifier': 'comment/id' });
    setIsReplying(false);
  }, [id, postNewComment]);

  const menuItems: any = useMemo(
    () => [canEdit && { id: 'edit', label: t('common/edit'), onClick: onEdit }].filter(Boolean),
    [onEdit, canEdit, t]
  );

  const showResponses = expanded && responseIds && !isEmpty(responseIds);

  return (
    <div className={'flex flex-col gap-4 rounded-lg border-b border-l border-gray-300 p-4'}>
      <div className={'flex flex-col gap-3'}>
        <div className={'flex items-center justify-between'}>
          <User name={authorName} />
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
            <WithContextMenu disable={isEditing} items={menuItems}>
              <TextAreaEditor
                cancelText={t('common/cancel')}
                className={'text-base text-gray-700'}
                doneText={t('common/done')}
                editable={isEditing}
                value={commentText}
                onCancel={onCancel}
                onChange={onChange}
                onDone={onDone}
              />
            </WithContextMenu>
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
        <NewComment
          authorName={currentUserName}
          cancelText={t('common/cancel')}
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
    <>
      {ids.map((id) => {
        return <Comment key={id} id={id} suspenseLines={2} />;
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
