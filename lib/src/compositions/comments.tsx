import {
  ChatBubbleLeftEllipsisOutline,
  ChevronDownMiniSolid,
  ChevronUpMiniSolid,
  PencilOutline,
  TrashOutline,
  UserCircleSolid,
} from '@elements/icons';
import { Button } from '@elements/components/button';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { Timestamp } from '@elements/components/timestamp';
import { TextEditor } from '@elements/compositions/text-editor';
import { Voting } from '@elements/compositions/voting';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useMemo, useState } from 'react';
import { type ItemType } from '@elements/components/dropdown';
import { useWrapRequireAuth } from '@elements/store/hooks';
import { ContextMenu as RawContextMenu } from '@elements/components/context-menu';
import type { LookupRef } from '@elements/types';

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

const ContextMenu = ({ id }: { id: string }) => {
  const t = useTranslation();

  const startDeletion = useDispatch('comment.deletion/start');
  const edit = useDispatch('comment.text/edit');

  const onDeleteClick = useCallback(() => startDeletion({ 'comment/id': id }), [id, startDeletion]);
  const onEditClick = useCallback(() => edit({ 'comment/id': id }), [id, edit]);

  const items = useMemo(
    () => [
      {
        text: t('common/edit'),
        onClick: onEditClick,
        Icon: PencilOutline,
        key: 'edit',
        type: 'button',
      },
      {
        text: t('common/delete'),
        onClick: onDeleteClick,
        Icon: TrashOutline,
        kind: 'danger',
        key: 'delete',
        type: 'button',
      },
    ],
    [t, onEditClick, onDeleteClick]
  ) as ItemType[];

  return <RawContextMenu items={items} orientation={'horizontal'} />;
};

export const Comment = suspensify(({ id }: { id: string }) => {
  const t = useTranslation();
  const lookupRef = useMemo(() => ['comment/id', id] as LookupRef, [id]);

  const currentUserName = useValue('current.user/name');
  const creatorName = useValue('comment.created-by/name', { 'comment/id': id });
  const status = useValue('comment/status', {
    'comment/id': id,
  });
  const text = useValue('comment/text', { 'comment/id': id });
  const createdAt = useValue('comment/created-at', { 'comment/id': id });
  const responseIds = useValue('comment/ids', { ref: lookupRef });
  const deleted = status === 'comment.status/deleted';

  const updateNewComment = useDispatch('new.comment/update');
  const postNewComment = useDispatch('new.comment/create');

  const [expanded, setExpanded] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  const onExpandCollapse = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const onToggleReply = useWrapRequireAuth(() => {
    setIsReplying(!isReplying);
  }, [isReplying]);

  const onNewCommentUpdate = useCallback(
    (value: string) => {
      updateNewComment({ ref: lookupRef, value });
    },
    [lookupRef, updateNewComment]
  );

  const onNewCommentPost = useCallback(() => {
    postNewComment({ ref: lookupRef });
    setIsReplying(false);
  }, [lookupRef, postNewComment]);

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
                refAttribute={'comment/text'}
                refId={id}
                richText={false}
                suspenseLines={2}
              />
              <div className={'flex gap-5'}>
                <Voting lookupRef={lookupRef} size={'xs'} suspenseLines={1} />
                <Button
                  Icon={ChatBubbleLeftEllipsisOutline}
                  clicked={isReplying}
                  kind={'tertiary'}
                  size={'xxs'}
                  value={t('common/reply')}
                  onClick={onToggleReply}
                />
                <ContextMenu id={id} />
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
    </div>
  );
});
/*
 TODO
 - Add transitions for a smoother animation
 - Expand collapse by clicking comment header
 - Avatar url
 */
