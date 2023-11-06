import { Button } from '@elements/components/button';
import RichTextArea, {
  PlainTextExtensions,
  RichTextExtensions,
  type RichTextOutput,
} from '@elements/components/rich-text-area';
import { type FormEventHandler, useCallback, useMemo } from 'react';

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
}

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

  return (
    <form
      className={
        editable ? 'flex w-full flex-col gap-3 rounded-lg bg-gray-100 p-3 text-gray-700' : 'w-full'
      }
      onSubmit={onSubmit}>
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
  );
};
