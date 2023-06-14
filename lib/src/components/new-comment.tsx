import { Button } from '@elements/components/button';
import { User } from '@elements/components/comment';
import RichTextArea, { RichTextAreaHandle } from '@elements/components/rich-text-area';
import { useCallback, useRef } from 'react';

interface NewCommentProps {
  placeholderText: string;
  postText: string;
  cancelText?: string;
  onCancel?: () => void;
  onChange: (value: string) => void;
  onPost: () => void;
  authorName: string;
}

export const NewComment = ({
  placeholderText,
  postText,
  onPost,
  onChange,
  authorName,
  cancelText,
  onCancel,
}: NewCommentProps) => {
  const editorRef = useRef<RichTextAreaHandle>(null);

  const onPostClick = useCallback(() => {
    onPost();
    editorRef.current?.clearContent();
  }, [onPost]);

  return (
    <div className={'flex flex-col gap-3'}>
      <User name={authorName} />
      <div
        className={
          'flex h-max w-full flex-col items-start justify-between gap-2 rounded-md border border-gray-300 p-3 shadow-sm'
        }>
        <RichTextArea
          ref={editorRef}
          className={'text-gray-700'}
          placeholder={placeholderText}
          onChange={onChange}
        />
        <div className={'flex w-full items-center justify-end gap-3'}>
          {onCancel && cancelText && (
            <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
          )}
          <Button
            color={'green'}
            kind={'primary'}
            size={'xs'}
            value={postText}
            onClick={onPostClick}
          />
        </div>
      </div>
    </div>
  );
};