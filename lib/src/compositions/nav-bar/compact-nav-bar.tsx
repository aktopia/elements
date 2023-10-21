import {
  HomeMiniSolid,
  MagnifyingGlassOutline,
  MapPinSolid,
  PinOnMap,
  PlusMiniSolid,
} from '@elements/icons';
import { Dropdown, type ItemType } from '@elements/components/dropdown';
import { suspensify } from '@elements/components/suspensify';
import { MainSearch } from '@elements/compositions/main-search';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useMemo } from 'react';
import { Auth } from '@elements/compositions/auth/auth';
import { CreateModal as ActionCreateModal } from '@elements/compositions/action/create-modal';
import { CreateModal as IssueCreateModal } from '@elements/compositions/issue/create-modal';
import { ChooseLocalitySlideOver } from '@elements/compositions/choose-locality';
import { Button } from '@elements/components/button';
import { Avatar } from '@elements/components/avatar';
import { Link } from '@elements/components/link';

const CreateButton = suspensify(() => {
  return (
    <button
      className={
        'relative flex items-center justify-center gap-1 overflow-hidden rounded-md bg-blue-600 p-2 default-focus'
      }
      type={'submit'}>
      <PlusMiniSolid className={'h-5 w-5 text-white stroke-4'} />
    </button>
  );
});

const CreateDropdown = suspensify(() => {
  const t = useTranslation();

  const onCreateAction = useDispatch('action.create.modal/open');
  const onCreateIssue = useDispatch('issue.create.modal/open');

  const items = useMemo(
    () => [
      {
        text: t('common/action'),
        onClick: onCreateAction,
        type: 'button',
        key: 'action',
      },
      {
        text: t('common/issue'),
        onClick: onCreateIssue,
        type: 'button',
        key: 'issue',
      },
    ],
    [onCreateAction, onCreateIssue, t]
  ) as ItemType[];

  return <Dropdown button={<CreateButton />} items={items} />;
});

export const SignInButton = suspensify(() => {
  const t = useTranslation();
  const onSignInClick = useDispatch('auth.sign-in/initiate');

  return (
    <button
      className={'cursor-pointer text-sm font-medium text-blue-600 default-focus'}
      type={'button'}
      onClick={onSignInClick}>
      {t('common/sign-in')}
    </button>
  );
});

const UserDropdown = suspensify(() => {
  const userId = useValue('current.user/id');
  const authenticated = useValue('auth.session/exists');
  const onSignOutClick = useDispatch('auth/sign-out');

  const button = (
    <button className={'flex cursor-pointer items-center gap-1 default-focus'} type={'button'}>
      <Avatar size={'sm'} />
    </button>
  );

  const items = useMemo(
    // TODO i18n
    () => [
      {
        type: 'link',
        text: 'My Actions',
        href: `/profile/${userId}#tab=actions`,
        key: 'my-actions',
      },
      {
        type: 'link',
        text: 'My Issues',
        href: `/profile/${userId}#tab=issues`,
        key: 'my-issues',
      },
      {
        type: 'separator',
        key: 'separator-1',
      },
      {
        type: 'link',
        text: 'My Account',
        href: `/account/${userId}`,
        key: 'my-account',
      },
      {
        type: 'separator',
        key: 'separator-2',
      },
      {
        type: 'button',
        text: 'Sign out',
        onClick: () => onSignOutClick({}),
        key: 'sign-out',
      },
    ],
    [userId, onSignOutClick]
  ) as ItemType[];

  return authenticated ? <Dropdown button={button} items={items} /> : <SignInButton />;
});

const Logo = () => {
  return (
    <Link
      className={
        'flex flex-col h-full w-max items-center justify-center bg-gradient-to-br from-blue-800 to-blue-600 px-3 default-focus'
      }
      href={'/'}>
      <HomeMiniSolid className={'h-5 w-5 text-white'} />
    </Link>
  );
};

const SearchBar = suspensify(() => {
  const onSearchClick = useDispatch('main-search/open');

  return (
    <button
      className={
        'flex cursor-pointer gap-5 rounded-xl border border-gray-300 bg-gray-100 p-3 default-focus'
      }
      type={'button'}
      onClick={onSearchClick}>
      <MagnifyingGlassOutline className={'h-4 w-4 text-gray-500'} />
    </button>
  );
});

const ChooseLocalityButton = suspensify(() => {
  const isLocalityChosen = useValue('user.chosen.locality/exists');
  const localityName = useValue('user.chosen.locality/name');
  const onOpen = useDispatch('choose-locality.slide-over/open') as () => void;

  return isLocalityChosen ? (
    <button
      className={
        'group flex max-w-5xl items-center justify-center gap-2 overflow-hidden default-focus'
      }
      type={'button'}
      onClick={onOpen}>
      <PinOnMap className={'h-5 w-5 text-gray-500 group-hover:text-gray-600'} />
      <span
        className={
          'overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 group-hover:text-gray-600 group-hover:underline'
        }>
        {localityName}
      </span>
    </button>
  ) : (
    <Button
      Icon={MapPinSolid}
      iconClassName={'stroke-2 relative top-px animate-bounce'}
      kind={'warning'}
      size={'xs'}
      value={'Set Locality'}
      onClick={onOpen}
    />
  );
});

export const CompactNavBar = () => {
  return (
    <>
      <nav
        className={
          'flex h-max w-full justify-between border-b border-b-gray-300 bg-white shadow-sm'
        }>
        <div>
          <Logo />
        </div>
        <div className={'flex items-center justify-center'}>
          <CreateDropdown />
        </div>
        <div className={'flex items-center justify-center'}>
          <ChooseLocalityButton />
        </div>
        <div className={'my-3 flex items-center justify-center'}>
          <SearchBar />
        </div>
        <div className={'flex items-center justify-center bg-white px-4'}>
          <UserDropdown />
        </div>
      </nav>
      <Auth suspenseLines={5} />
      <MainSearch suspenseLines={5} />
      <ActionCreateModal suspenseLines={1} />
      <IssueCreateModal suspenseLines={1} />
      <ChooseLocalitySlideOver suspenseLines={1} />
    </>
  );
};
