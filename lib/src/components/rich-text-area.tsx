import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { memo, useEffect } from 'react';

interface RichTextAreaProps {
  className?: string;
  onChange: (value: string) => void;
  initialValue: string;
  editable: boolean;
  output?: 'html' | 'text';
}

export const RichTextArea = memo(
  ({ className, onChange, initialValue, output = 'html', editable }: RichTextAreaProps) => {
    const editor = useEditor({
      editable: editable || false,
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
      content: initialValue,
    });

    useEffect(() => {
      editor?.commands.setContent(initialValue, true);
    }, [editor, initialValue]);

    return <EditorContent editor={editor} />;
  }
);

export default RichTextArea;
