import { UserCircleSolid } from '@elements/_icons';
import { NewContent } from '@elements/components/new-content';
import { suspensify } from '@elements/components/suspensify';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

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
  const text = useValue<string>('update/text', { 'update/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex w-full items-center justify-between'}>
        <User name={creatorName} />
        {/*<p className={'text-sm text-gray-500'}>{'2 days ago'}</p>*/}
      </div>
      <TextEditor content={text} refAttribute={'update/text'} refId={id} suspense={{ lines: 4 }} />
    </div>
  );
});

interface UpdatesProps {
  refId: string;
  refAttribute: string;
}

export const Updates = suspensify(({ refId, refAttribute }: UpdatesProps) => {
  const t = useTranslation();
  const reference = useMemo(
    () => ({ 'ref/id': refId, 'ref/attribute': refAttribute }),
    [refId, refAttribute]
  );
  const currentUserId = useValue<string>('current.user/id');
  const currentUserName = useValue<string>('user/name', { 'user/id': currentUserId });
  const updateIds = useValue<string[]>('updates/ids-by-reference', reference);

  const updateContent = useDispatch('new.update/update');
  const postContent = useDispatch('new.update/post');

  const onChange = useCallback(
    (value: string) => {
      updateContent({ ...reference, value });
    },
    [updateContent, reference]
  );

  const onPost = useCallback(() => {
    postContent(reference);
  }, [postContent, reference]);

  return (
    <div className={'flex flex-col gap-7'}>
      <NewContent
        creatorName={currentUserName}
        placeholderText={"Any updates that you'd like to share?"}
        postText={t('common/post')}
        onChange={onChange}
        onPost={onPost}
      />
      <div className={'w-full'}>
        {updateIds.map((id, idx) => (
          <div key={id} className={'w-full'}>
            {idx !== 0 && <div className={'my-2.5 ml-9 h-7 w-0.5 rounded bg-gray-300'} />}
            <Update id={id} suspense={{ lines: 5 }} />
          </div>
        ))}
      </div>
    </div>
  );
});
