import { ChevronDownMiniSolid, UserCircleSolid } from '@elements/_icons';
import { Dropdown } from '@elements/components/dropdown';
import { suspensify } from '@elements/components/suspensify';
import { SocialSignIn } from '@elements/compositions/auth/social-sign-in';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useMemo } from 'react';

const CreateButton = () => {
  const t = useTranslation();
  return (
    <div className={'flex cursor-pointer items-start gap-4'}>
      <div
        className={
          'relative flex items-center justify-center gap-1 overflow-hidden rounded-md bg-blue-600 py-2 pl-3 pr-2'
        }>
        <p className={'text-xs font-medium text-white'}>{t('common/create')}</p>
        <ChevronDownMiniSolid className={'h-4 w-4 text-white'} />
      </div>
    </div>
  );
};

const CreateDropdown = () => {
  const items = useMemo(
    () => [
      {
        text: 'Action',
        href: '/action/create',
        openNewTab: true,
      },
    ],
    []
  );
  return <Dropdown Button={CreateButton} items={items} />;
};

const Avatar = () => {
  return (
    <div className={'flex items-center gap-1'}>
      <UserCircleSolid className={'h-8 w-8 text-gray-600'} />
      <ChevronDownMiniSolid className={'h-4 w-4 text-gray-600'} />
    </div>
  );
};

export const SignInButton = () => {
  const t = useTranslation();
  const onSignInClick = useDispatch('auth.sign-in/initiate');

  return (
    <div>
      <div className={'cursor-pointer text-sm font-medium text-blue-600'} onClick={onSignInClick}>
        {t('common/sign-in')}
      </div>
    </div>
  );
};

const UserDropdown = suspensify(() => {
  const userId = useValue('current.user/id');
  const authenticated = useValue<boolean>('auth.session/exists');
  const onSignOutClick = useDispatch('auth/sign-out');
  const items = useMemo(
    () => [
      {
        text: 'My actions',
        href: `/profile/${userId}/actions`,
      },
      {
        text: 'Sign out',
        onClick: () => onSignOutClick({}),
      },
    ],
    [userId, onSignOutClick]
  );
  return authenticated ? (
    <Dropdown Button={Avatar} align={'right'} items={items} />
  ) : (
    <SignInButton />
  );
});

export const NavBar = () => {
  return (
    <div
      className={
        'flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-2.5 shadow-sm md:px-14'
      }>
      <CreateDropdown />
      <UserDropdown suspense={{ lines: 5 }} />
      <SocialSignIn suspense={{ lines: 5 }} />
    </div>
  );
};
