import { ChevronDownMiniSolid, ChevronUpMiniSolid, UserCircleSolid } from '@elements/icons';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import isEmpty from 'lodash/isEmpty';
import { memo, useCallback, useState } from 'react';

export interface CommentProps {
  id: string;
  authorName: string;
  value: string;
  responses?: CommentProps[];
  canEdit: boolean;
  onEditCancel: (id: string) => void;
  onEditDone: (id: string) => void;
  editText: string;
  editCancelText: string;
  editDoneText: string;
  onUpdate: (id: string, value: string) => void;
}

interface CommentsProps {
  comments: CommentProps[];
}

export const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

export const Comment = memo(
  ({
    id,
    authorName,
    value,
    responses,
    editCancelText,
    editDoneText,
    onEditDone,
    onEditCancel,
    onUpdate,
  }: CommentProps) => {
    const [expanded, setExpanded] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const onExpandCollapse = useCallback(() => {
      setExpanded(!expanded);
    }, [expanded]);

    const onCancel = useCallback(() => {
      onEditCancel(id);
      setIsEditing(false);
    }, [id, onEditCancel]);

    const onDone = useCallback(() => {
      onEditDone(id);
      setIsEditing(false);
    }, [id, onEditDone]);

    const onChange = useCallback(
      (value: string) => {
        onUpdate(id, value);
      },
      [id, onUpdate]
    );

    const showResponses = expanded && responses && !isEmpty(responses);

    return (
      <div
        className={
          'flex flex-col gap-4 rounded-lg border-b border-l border-gray-300 p-4 shadow-sm'
        }>
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
            <TextAreaEditor
              cancelText={editCancelText}
              className={'text-base text-gray-700'}
              content={value}
              doneText={editDoneText}
              editable={isEditing}
              onCancel={onCancel}
              onChange={onChange}
              onDone={onDone}
            />
          )}
        </div>
        {showResponses && <Comments comments={responses} />}
      </div>
    );
  }
);

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <>
      {comments.map((comment: CommentProps) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </>
  );
};

/*
 TODO
 - Add transitions for a smoother animation
 - Expand collapse by clicking comment header
 - Avatar url
 */
