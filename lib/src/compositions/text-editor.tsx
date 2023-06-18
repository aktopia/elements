import { suspensify } from '@elements/components/suspensify';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import { WithContextMenu } from '@elements/components/with-context-menu';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

interface TextEditorProps {
  refId: string;
  refAttribute: string;
  content: string;
}

export const TextEditor = suspensify(({ refId, refAttribute, content }: TextEditorProps) => {
  const t = useTranslation();
  const reference = useMemo(
    () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
    [refAttribute, refId]
  );
  const userId = useValue<string>('current.user/id');
  const canEdit = useValue<boolean>('text-editor/can-edit', {
    ...reference,
    'user/id': userId,
  });
  const isEditing = useValue<boolean>('text-editor/editing', reference) || false;

  const edit = useDispatch('text-editor/edit');
  const editDone = useDispatch('text-editor.edit/done');
  const editCancel = useDispatch('text-editor.edit/cancel');
  const updateContent = useDispatch('text-editor.content/update');

  const onEdit = useCallback(() => {
    edit(reference);
  }, [edit, reference]);

  const onChange = useCallback(
    (value: string) => {
      updateContent({ ...reference, value });
    },
    [updateContent, reference]
  );

  const onCancel = useCallback(() => {
    editCancel(reference);
  }, [reference, editCancel]);

  const onDone = useCallback(() => {
    editDone(reference);
  }, [reference, editDone]);

  const menuItems: any = useMemo(
    () => [canEdit && { id: 'edit', label: t('common/edit'), onClick: onEdit }].filter(Boolean),
    [onEdit, canEdit, t]
  );

  return (
    <WithContextMenu disable={isEditing} items={menuItems}>
      <TextAreaEditor
        cancelText={t('common/cancel')}
        className={'text-base text-gray-700'}
        content={content}
        doneText={t('common/done')}
        editable={isEditing}
        onCancel={onCancel}
        onChange={onChange}
        onDone={onDone}
      />
    </WithContextMenu>
  );
});
