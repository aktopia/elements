import { Button } from '@elements/components/button';
import RichTextArea from '@elements/components/rich-text-area';

interface TitleEditorProps {
  value: string;
  doneText: string;
  cancelText: string;
  editable: boolean;
  onDone: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export const TitleEditor = ({
  value,
  onDone,
  onCancel,
  doneText,
  cancelText,
  onChange,
  editable,
}: TitleEditorProps) => {
  return (
    <div
      className={
        editable
          ? 'flex flex-col gap-2 rounded-lg border border-gray-400 bg-gray-50 p-3 text-2xl font-semibold text-gray-700 shadow-inner md:flex-row'
          : 'text-2xl font-bold text-gray-900'
      }>
      <RichTextArea editable={editable} initialValue={value} output={'text'} onChange={onChange} />
      {editable && (
        <div className={'ml-auto flex items-start justify-end gap-3'}>
          <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
          <Button color={'green'} kind={'primary'} size={'xs'} value={doneText} onClick={onDone} />
        </div>
      )}
    </div>
  );
};
