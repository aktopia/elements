import { Button } from '@elements/components/button';
import RichTextArea from '@elements/components/rich-text-area';
import { useTranslation } from '@elements/translation';

interface TextAreaEditorProps {
  value: string;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export const TextAreaEditor = ({ value, onSave, onCancel, onChange }: TextAreaEditorProps) => {
  const t = useTranslation();
  return (
    <div
      className={
        'flex flex-col items-end justify-start gap-3 rounded-lg border border-gray-400 bg-gray-50 p-3 text-gray-700 shadow-inner'
      }>
      <RichTextArea initialValue={value} onChange={onChange} />
      <div className={'flex items-start justify-end gap-3'}>
        <Button kind={'tertiary'} size={'xs'} value={t('common/cancel')} onClick={onCancel} />
        <Button
          color={'green'}
          kind={'primary'}
          size={'xs'}
          value={t('common/save')}
          onClick={onSave}
        />
      </div>
    </div>
  );
};
