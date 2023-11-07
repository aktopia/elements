import { Button } from '@elements/components/button';
import RichTextArea, {
  PlainTextExtensions,
  RichTextExtensions,
  type RichTextOutput,
} from '@elements/components/rich-text-area';
import { type FormEventHandler, useCallback, useMemo } from 'react';
import { cva } from 'cva';
import { ExclamationCircleMiniSolid } from '@elements/icons';

interface TextAreaEditorProps {
  content: string;
  doneText: string;
  cancelText: string;
  editable: boolean;
  output?: RichTextOutput;
  className?: string;
  placeholder?: string;
  onDone: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  richText?: boolean;
  error?: string;
}

const formContainerVariants = cva('w-full', {
  variants: {
    editable: { true: 'flex flex-col gap-3 bg-gray-100 p-3 text-gray-700' },
    hasError: {
      true: 'border-red-600 border-2 focus:border-2 focus:border-red-600 rounded-t-md rounded-br-md focus:ring-0 bg-red-50',
      false: 'rounded-md default-focus border-none',
    },
  },
});

export const TextAreaEditor = ({
  content,
  onDone,
  onCancel,
  doneText,
  cancelText,
  onChange,
  editable,
  className,
  placeholder,
  output,
  richText = true,
  error,
}: TextAreaEditorProps) => {
  const [extensions, defaultOutput] = useMemo(() => {
    if (richText) {
      return [RichTextExtensions, 'html'];
    }
    return [PlainTextExtensions, 'text'];
  }, [richText]);

  const outputValue = (output || defaultOutput) as RichTextOutput;

  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onDone();
    },
    [onDone]
  );
  const hasError = !!error;

  return (
    <div className={'relative w-full'}>
      <form className={formContainerVariants({ editable, hasError })} onSubmit={onSubmit}>
        <RichTextArea
          className={className}
          editable={editable}
          extensions={extensions}
          initialContent={content}
          output={outputValue}
          placeholder={placeholder}
          onChange={onChange}
        />
        {editable && (
          <div className={'flex items-start justify-end gap-3'}>
            <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
            <Button kind={'success'} size={'xs'} type={'submit'} value={doneText} />
          </div>
        )}
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
  );
};
