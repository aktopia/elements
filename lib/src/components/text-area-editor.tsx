import { Button } from '@elements/components/button';
import RichTextArea from '@elements/components/rich-text-area';

interface TextAreaEditorProps {
  content: string;
  doneText: string;
  cancelText: string;
  editable: boolean;
  className?: string;
  onDone: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
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
}: TextAreaEditorProps) => {
  return (
    <div
      className={
        editable
          ? 'flex w-full flex-col gap-3 rounded-lg border border-gray-400 bg-gray-50 p-3 text-gray-700 shadow-inner'
          : 'w-full'
      }>
      <RichTextArea
        className={className}
        editable={editable}
        initialContent={content}
        onChange={onChange}
      />
      {editable && (
        <div className={'flex items-start justify-end gap-3'}>
          <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
          <Button color={'green'} kind={'primary'} size={'xs'} value={doneText} onClick={onDone} />
        </div>
      )}
    </div>
  );
};
