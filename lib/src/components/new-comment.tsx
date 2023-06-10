import { Button } from '@elements/components/button';
import { User } from '@elements/components/comment';
import RichTextArea from '@elements/components/rich-text-area';

interface NewCommentProps {
  placeholderText: string;
  postText: string;
  onChange: (value: string) => void;
  onPost: () => void;
  authorName: string;
}

export const NewComment = ({
  placeholderText,
  postText,
  onPost,
  onChange,
  authorName,
}: NewCommentProps) => {
  return (
    <div className={'flex flex-col gap-3'}>
      <User name={authorName} />
      <div
        className={
          'flex h-max w-full flex-col items-start justify-between gap-2 rounded-md border border-gray-300 p-3 shadow-sm'
        }>
        <RichTextArea
          className={'text-gray-700'}
          placeholder={placeholderText}
          onChange={onChange}
        />
        <div className={'flex w-full justify-end'}>
          <Button color={'green'} kind={'primary'} size={'xs'} value={postText} onClick={onPost} />
        </div>
      </div>
    </div>
  );
};
