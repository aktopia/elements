import { suspensify } from '@elements/components/suspensify';
import { TextAreaEditor } from '@elements/components/text-area-editor';
import { useDispatch, useValue } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';
import type { ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import type { Ident } from '@elements/types';
import type { RichTextAreaHandle } from '@elements/components/rich-text-area';

interface TextEditorProps {
  refId: string;
  refAttribute: string;
  content: string;
  className: string;
  placeholder?: string;
  noContent?: ReactElement;
  output?: 'html' | 'text';
  richText?: boolean;
  error?: string;
}

// TODO Refactor to pass lookup ref instead of refId and refAttribute
export const TextEditor = suspensify(
  ({
    refId,
    refAttribute,
    content,
    className,
    placeholder,
    noContent,
    output,
    richText = false, // TODO: change to true once we fully support rich text
  }: TextEditorProps) => {
    const t = useTranslation();
    const editorRef = useRef<RichTextAreaHandle>(null);
    const reference = useMemo(
      () => ({ ref: [refAttribute, refId] as Ident }),
      [refAttribute, refId]
    );

    const isEditing = useValue('text-editor/editing', reference);
    const error = useValue('text-editor/error', reference);
    const shouldReset = useValue('text-editor/reset', reference);

    const editDone = useDispatch('text-editor.edit/done');
    const editCancel = useDispatch('text-editor.edit/cancel');
    const updateContent = useDispatch('text-editor.text/update');
    const resetComplete = useDispatch('text-editor.reset/complete');

    useEffect(() => {
      updateContent({ ...reference, value: content });
    }, [content, reference, updateContent]);

    useEffect(() => {
      if (shouldReset) {
        editorRef.current?.setContent(content);
        resetComplete(reference);
      }
    }, [shouldReset, resetComplete, updateContent, content, reference]);

    const onChange = useCallback(
      (value: string) => {
        updateContent({ ...reference, value });
      },
      [updateContent, reference]
    );

    const onCancel = useCallback(() => {
      editCancel(reference);
    }, [reference, editCancel]);

    const onDone = useCallback(async () => {
      await editDone(reference);
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
        editorRef={editorRef}
        error={error}
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
