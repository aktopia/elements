import { Button } from '@elements/components/button';
import { User } from '@elements/components/comment';
import type { RichTextAreaHandle } from '@elements/components/rich-text-area';
import RichTextArea from '@elements/components/rich-text-area';
import { type FormEventHandler, useCallback, useRef } from 'react';
import { ExclamationCircleMiniSolid } from '@elements/icons';
import { cva } from '@elements/utils/style';

interface NewContentProps {
  placeholderText: string;
  postText: string;
  cancelText?: string;
  onCancel?: () => void;
  onChange: (value: string) => void;
  onPost: () => void;
  creatorName: string;
  error?: string;
}

const formContainerVariants = cva(
  'flex h-max w-full flex-col items-start justify-between gap-2 p-3',
  {
    variants: {
      hasError: {
        true: 'border-red-600 border-2 rounded-t-md rounded-br-md focus:border-2 focus:border-red-600 focus:ring-0 bg-red-50',
        false: 'rounded-md default-focus border border-gray-300 shadow-sm',
      },
    },
  }
);

export const NewContent = ({
  placeholderText,
  postText,
  onPost,
  onChange,
  creatorName,
  cancelText,
  onCancel,
  error,
}: NewContentProps) => {
  const hasError = !!error;
  const editorRef = useRef<RichTextAreaHandle>(null);

  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onPost();
      editorRef.current?.clearContent();
    },
    [onPost]
  );

  return (
    <div className={'flex flex-col gap-3'}>
      <User name={creatorName} />
      <div>
        <form className={formContainerVariants({ hasError })} onSubmit={onSubmit}>
          <RichTextArea
            ref={editorRef}
            className={'text-gray-700'}
            editable={true}
            placeholder={placeholderText}
            onChange={onChange}
          />
          <div className={'flex w-full items-center justify-end gap-3'}>
            {onCancel && cancelText && (
              <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
            )}
            <Button kind={'success'} size={'xs'} type={'submit'} value={postText} />
          </div>
        </form>
        {hasError ? (
          <div
            className={
              'flex gap-1.5 h-max w-max bg-red-500 text-white rounded-b-md pr-2 pl-1.5 pt-1 pb-1.5'
            }>
            <ExclamationCircleMiniSolid className={'text-white h-4 w-4'} />
            <p className={'text-xs font-semibold'}>{error}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
