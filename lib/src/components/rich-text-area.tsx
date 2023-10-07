import { Editor, EditorContent, useEditor } from '@tiptap/react';
import isNil from 'lodash/isNil';
import type { ForwardRefRenderFunction, MutableRefObject } from 'react';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

export const plainTextExtensions = [Document, Text, Paragraph, History];

export const richTextExtensions = [
  ...plainTextExtensions,
  Bold,
  Italic,
  Strike,
  ListItem,
  BulletList.configure({
    keepMarks: true,
    keepAttributes: false,
  }),
  Heading,
  OrderedList.configure({
    keepMarks: true,
    keepAttributes: false,
  }),
];

export type RichTextOutput = 'html' | 'text';

interface RichTextAreaProps {
  className?: string;
  onChange: (value: string) => void;
  initialContent?: string;
  editable: boolean;
  output?: RichTextOutput;
  placeholder?: string;
  clearValue?: () => void;
  setValue?: (value: string) => void;
  extensions?: any[];
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
    extensions = richTextExtensions,
  },
  ref
) => {
  const content = isNil(initialContent) ? '' : initialContent;
  const editor = useEditor({
    editable: editable,
    extensions: [
      ...extensions,
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

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);

  return <EditorContent className={'h-full w-full'} editor={editor} />;
};

export const RichTextArea = memo(forwardRef(RichTextArea_));
export default RichTextArea;
