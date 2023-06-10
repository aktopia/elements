import { ChevronDownMiniSolid, ChevronUpMiniSolid, UserCircleSolid } from '@elements/_icons';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import { WithContextMenu } from '@elements/components/with-context-menu';
import { isEmpty } from 'lodash';
import { memo, useCallback, useMemo, useState } from 'react';

export interface CommentProps {
  id: string;
  authorName: string;
  value: string;
  subComments?: CommentProps[];
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
export const Comment = memo(
  ({
    id,
    authorName,
    value,
    subComments,
    canEdit,
    editText,
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
    const onEdit = useCallback(() => {
      setIsEditing(true);
    }, []);
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
    const menuItems: any = useMemo(
      () => [canEdit && { id: 'edit', label: editText, onClick: onEdit }].filter(Boolean),
      [onEdit, canEdit, editText]
    );

    const showSubComments = expanded && subComments && !isEmpty(subComments);

    return (
      <div
        className={
          'flex flex-col gap-4 rounded-lg border-b border-l border-gray-300 p-4 shadow-sm'
        }>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex items-center justify-between'}>
            <div className={'flex items-center gap-3'}>
              <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
              <p className={'text-sm font-medium text-gray-600'}>{authorName}</p>
            </div>
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
            <WithContextMenu disable={isEditing} items={menuItems}>
              <TextAreaEditor
                cancelText={editCancelText}
                className={'text-base text-gray-700'}
                doneText={editDoneText}
                editable={isEditing}
                value={value}
                onCancel={onCancel}
                onChange={onChange}
                onDone={onDone}
              />
            </WithContextMenu>
          )}
        </div>
        {showSubComments && <Comments comments={subComments} />}
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
