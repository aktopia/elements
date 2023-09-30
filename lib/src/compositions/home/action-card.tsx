import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store/interface';
import { Timestamp } from '@elements/components/timestamp';
// import { Voting } from '@elements/compositions/voting';
import { EntityType } from '@elements/compositions/entity-type';
import { EntityType as Type } from '@elements/types';

export const ActionCard = suspensify(({ id }: { id: string }) => {
  const title = useValue('action.title/text', { 'action/id': id });
  const lastActive = useValue('action/updated-at', { 'action/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-5 shadow-sm'
      }>
      <div className={'flex w-full items-center gap-5'}>
        <EntityType size={'sm'} type={Type.Action} />
        <Timestamp
          className={'text-xs text-gray-500'}
          // TODO i18n
          prefix={'Active'}
          relative={true}
          timestamp={lastActive}
        />
      </div>
      <h1>{title}</h1>
      <div className={'flex items-center gap-5'}>
        {/*<Voting refAttribute={'entity.type/update'} refId={id} size={'xs'} suspenseLines={2} />*/}
      </div>
    </div>
  );
});
