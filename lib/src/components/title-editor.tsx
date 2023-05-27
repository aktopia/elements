import { Button } from '@elements/components/button';
import RichTextArea from '@elements/components/rich-text-area';

interface TitleEditorProps {
  value: string;
  doneText: string;
  cancelText: string;
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
}: TitleEditorProps) => {
  return (
    <div
      className={
        'flex flex-col gap-1 rounded-lg border border-gray-400 bg-gray-50 p-3 text-2xl font-semibold text-gray-700 shadow-inner md:flex-row'
      }>
      <RichTextArea initialValue={value} output={'text'} onChange={onChange} />
      <div className={'ml-auto flex items-start justify-end gap-3'}>
        <Button kind={'tertiary'} size={'xs'} value={cancelText} onClick={onCancel} />
        <Button color={'green'} kind={'primary'} size={'xs'} value={doneText} onClick={onDone} />
      </div>
    </div>
  );
};
