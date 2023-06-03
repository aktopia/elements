import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextAreaProps {
  className?: string;
  onChange: (value: string) => void;
  initialValue: string;
  editable: boolean;
  output?: 'html' | 'text';
}

export const RichTextArea = ({
  className,
  onChange,
  initialValue,
  output = 'html',
  editable = false,
}: RichTextAreaProps) => {
  const editor = useEditor({
    editable,
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

  return <EditorContent editor={editor} />;
};

export default RichTextArea;
