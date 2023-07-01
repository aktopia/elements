import { suspensify } from '@elements/components/suspensify';
import { ActionSection } from '@elements/compositions/profile/actions';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';

const Name = suspensify(() => {
  const userId = useValue<string>('profile.user/id');
  const name = useValue<string>('user/name', { 'user/id': userId });
  return <div className={'w-full text-2xl font-bold text-gray-900'}>{name}</div>;
});

export const Profile = wrapPage(() => {
  return (
    <div className={'flex flex-col gap-6'}>
      <Name suspense={{ lines: 1 }} />
      <ActionSection suspense={{ lines: 10 }} />
    </div>
  );
});

export const routes = {
  'profile/view': Profile,
};
