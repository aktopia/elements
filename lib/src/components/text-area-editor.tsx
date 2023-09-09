import { Button } from '@elements/components/button';
import RichTextArea, {
  plainTextExtensions,
  richTextExtensions,
} from '@elements/components/rich-text-area';
import { useMemo } from 'react';

interface TextAreaEditorProps {
  content: string;
  doneText: string;
  cancelText: string;
  editable: boolean;
  output?: 'html' | 'text';
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
  const extensions = useMemo(() => {
    if (richText) {
      return richTextExtensions;
    }
    return plainTextExtensions;
  }, [richText]);

  return (
    <div
      className={
        editable ? 'flex w-full flex-col gap-3 rounded-lg bg-gray-100 p-3 text-gray-700' : 'w-full'
      }>
      <RichTextArea
        className={className}
        editable={editable}
        extensions={extensions}
        initialContent={content}
        output={output}
        placeholder={placeholder}
        onChange={onChange}
      />
      {editable && (
        <div className={'flex items-start justify-end gap-3'}>
          <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
          <Button kind={'success'} size={'xs'} value={doneText} onClick={onDone} />
        </div>
      )}
    </div>
  );
};
