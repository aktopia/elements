import { suspensify } from '@elements/components/suspensify';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import type { ReactElement } from 'react';
import { useCallback, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import type { LookupRef } from '@elements/types';

interface TextEditorProps {
  refId: string;
  refAttribute: string;
  content: string;
  className: string;
  placeholder?: string;
  noContent?: ReactElement;
  output?: 'html' | 'text';
  richText?: boolean;
}

export const TextEditor = suspensify(
  ({
    refId,
    refAttribute,
    content,
    className,
    placeholder,
    noContent,
    output,
    richText,
  }: TextEditorProps) => {
    const t = useTranslation();
    const reference = useMemo(
      () => ({ ref: [refAttribute, refId] as LookupRef }),
      [refAttribute, refId]
    );

    const isEditing = useValue('text-editor/editing', reference);

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

    const showNoContent = isEmpty(content) && noContent && !isEditing;

    return showNoContent ? (
      noContent
    ) : (
      <TextAreaEditor
        cancelText={t('common/cancel')}
        className={className}
        content={content}
        doneText={t('common/done')}
        editable={isEditing}
        output={output}
        placeholder={placeholder}
        richText={richText}
        onCancel={onCancel}
        onChange={onChange}
        onDone={onDone}
      />
    );
  }
);
