import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';

const ActionCard = suspensify(({ id }: any) => {
  const title = useValue('action/title', { 'action/id': id });

  return (
    <div
      className={
        'flex w-full flex-col items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm'
      }>
      <a
        className={'w-full cursor-pointer text-left text-base text-gray-700'}
        href={`/action/${id}`}>
        {title}
      </a>
    </div>
  );
});

export const Actions = suspensify(() => {
  const userId = useValue('profile.user/id');
  const actionIds = useValue('profile.action/ids', { 'user/id': userId });

  return (
    <div className={'flex flex-col gap-4'}>
      {actionIds.map((id) => (
        <ActionCard key={id} id={id} suspenseLines={2} />
      ))}
    </div>
  );
});
