import { UserCircleSolid } from '@elements/_icons';
import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';

const User = ({ name }: { name: string }) => {
  return (
    <div className={'flex items-center gap-3'}>
      <UserCircleSolid className={'h-8 w-8 object-cover text-gray-500'} />
      <p className={'text-sm font-medium text-gray-700'}>{name}</p>
    </div>
  );
};

const Update = ({ id }: { id: string }) => {
  const content = useValue<string>('update/content', { 'update/id': id });
  const creatorName = useValue<string>('update/creator-name', { 'update/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex w-full items-center justify-between'}>
        <User name={creatorName} />
        {/*<p className={'text-sm text-gray-500'}>{'2 days ago'}</p>*/}
      </div>
      <p className={'w-full text-base text-gray-700'}>{content}</p>
    </div>
  );
};

interface UpdatesProps {
  parentId: string;
  parentIdentifier: string;
}

export const Updates = suspensify(({ parentId, parentIdentifier }: UpdatesProps) => {
  const updateIds = useValue<string[]>('updates/ids-by-parent-id', {
    'parent/id': parentId,
    'parent.id/identifier': parentIdentifier,
  });

  return (
    <div className={'flex flex-col gap-2.5'}>
      {updateIds.map((id, idx) => (
        <>
          {idx !== 0 && <div className={'ml-9 h-7 w-0.5 rounded bg-gray-300'} />}
          <Update key={id} id={id} />
        </>
      ))}
    </div>
  );
});
