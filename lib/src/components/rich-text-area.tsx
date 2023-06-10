import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { isNil } from 'lodash';
import { memo, useEffect } from 'react';

interface RichTextAreaProps {
  className?: string;
  onChange: (value: string) => void;
  initialValue?: string;
  editable?: boolean;
  output?: 'html' | 'text';
  placeholder?: string;
}

export const RichTextArea = memo(
  ({
    className,
    onChange,
    initialValue,
    output = 'html',
    editable,
    placeholder,
  }: RichTextAreaProps) => {
    const initialContent = isNil(initialValue) ? '' : initialValue;
    const editor = useEditor({
      editable: isNil(editable) ? true : editable,
      extensions: [
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
        Placeholder.configure({
          placeholder: placeholder,
        }),
      ],
      editorProps: {
        attributes: {
          class: `focus:outline-none ${className || ''}`.trim(),
        },
      },
      onUpdate: ({ editor }) => {
        let value;
        switch (output) {
          case 'html':
            value = editor.getHTML();
            break;
          case 'text':
            value = editor.getText();
            break;
        }
        onChange(value);
      },
      content: initialContent,
    });

    useEffect(() => {
      editor?.commands.setContent(initialContent, true);
    }, [editor, initialContent]);

    return <EditorContent className={'h-full w-full'} editor={editor} />;
  }
);

export default RichTextArea;
