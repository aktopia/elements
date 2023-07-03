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
  className: string;
}

interface MenuItem {
  id: string;
  label: string;
  onClick: () => void;
}

export const TextEditor = suspensify(
  ({ refId, refAttribute, content, className }: TextEditorProps) => {
    const t = useTranslation();
    const reference = useMemo(
      () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
      [refAttribute, refId]
    );
    const menuItems = useValue<MenuItem[]>('text-editor.menu/items', reference);
    const isEditing = useValue<boolean>('text-editor/editing', reference) || false;

    const editDone = useDispatch('text-editor.edit/done');
    const editCancel = useDispatch('text-editor.edit/cancel');
    const updateContent = useDispatch('text-editor.text/update');

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

    const items = menuItems.map((item) => ({ ...item, label: t(item.label) }));

    return (
      <WithContextMenu disable={isEditing} items={items}>
        <TextAreaEditor
          cancelText={t('common/cancel')}
          className={className}
          content={content}
          doneText={t('common/done')}
          editable={isEditing}
          onCancel={onCancel}
          onChange={onChange}
          onDone={onDone}
        />
      </WithContextMenu>
    );
  }
);
