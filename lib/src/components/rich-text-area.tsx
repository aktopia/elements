import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { isNil } from 'lodash';
import {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

interface RichTextAreaProps {
  className?: string;
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  output?: 'html' | 'text';
  placeholder?: string;
  clearValue?: () => void;
  setValue?: (value: string) => void;
}

export interface RichTextAreaHandle {
  clearContent: () => void;
}

// DO NOT MAKE THIS A CONTROLLED COMPONENT
const RichTextArea_: ForwardRefRenderFunction<RichTextAreaHandle, RichTextAreaProps> = (
  {
    className,
    onChange,
    initialContent,
    output = 'html',
    editable,
    placeholder,
  }: RichTextAreaProps,
  ref
) => {
  const content = isNil(initialContent) ? '' : initialContent;
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
    content: content,
  });

  const editorRef: MutableRefObject<Editor | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    clearContent: (emitUpdate?: boolean) => {
      editorRef.current?.commands.clearContent(emitUpdate ? emitUpdate : false);
    },
  }));

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [editor, content]);

  return <EditorContent className={'h-full w-full'} editor={editor} />;
};

export const RichTextArea = forwardRef(RichTextArea_);
export default RichTextArea;
