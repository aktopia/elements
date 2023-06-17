import { UserCircleSolid } from '@elements/_icons';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback } from 'react';

const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

const Update = suspensify(({ id }: { id: string }) => {
  const creatorName = useValue<string>('update/creator-name', { 'update/id': id });
  const content = useValue<string>('update/content', { 'update/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex w-full items-center justify-between'}>
        <User name={creatorName} />
        {/*<p className={'text-sm text-gray-500'}>{'2 days ago'}</p>*/}
      </div>
      <TextEditor content={content} refAttr={'update/id'} refId={id} suspense={{ lines: 4 }} />
    </div>
  );
});

interface UpdatesProps {
  refId: string;
  refAttr: string;
}

export const Updates = suspensify(({ refId, refAttr }: UpdatesProps) => {
  const t = useTranslation();
  const currentUserId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': currentUserId });
  const updateIds = useValue<string[]>('updates/ids-by-reference', {
    'ref/id': refId,
    'ref/attr': refAttr,
  });

  const updateContent = useDispatch('new.content/update');
  const postContent = useDispatch('new.content/post');

  const onChange = useCallback(
    (value: string) => {
      updateContent({ 'ref/id': refId, value });
    },
    [updateContent, refId]
  );

  const onPost = useCallback(() => {
    postContent({ 'ref/id': refId, 'ref/attr': refAttr });
  }, [postContent, refId, refAttr]);

  return (
    <div className={'flex flex-col gap-7'}>
      <NewContent
        creatorName={currentUserName}
        placeholderText={"Any updates that you'd like to share?"}
        postText={t('common/post')}
        onChange={onChange}
        onPost={onPost}
      />
      <div>
        {updateIds.map((id, idx) => (
          <>
            {idx !== 0 && <div key={id} className={'my-2.5 ml-9 h-7 w-0.5 rounded bg-gray-300'} />}
            <Update key={id} id={id} suspense={{ lines: 5 }} />
          </>
        ))}
      </div>
    </div>
  );
});
