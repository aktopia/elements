import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { Actions } from '@elements/compositions/profile/actions';
import { Issues } from '@elements/compositions/profile/issues';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

const Name = suspensify(() => {
  const userId = useValue<string>('profile.user/id');
  const name = useValue<string>('user/name', { 'user/id': userId });
  return <div className={'w-full text-2xl font-bold text-gray-900'}>{name}</div>;
});

type TabId = 'actions' | 'issues';

const ProfileTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue<TabId>('profile.tabs/active-tab-id');
  const updateTab = useDispatch('profile.tabs/update');
  const tabs = useMemo(
    () => [
      {
        id: 'actions',
        label: t('common/actions'),
      },
      {
        id: 'issues',
        label: t('common/issues'),
      },
    ],
    [t]
  );

  const onTabClick = useCallback(
    (tabId: string) => {
      updateTab({ 'tab/id': tabId });
    },
    [updateTab]
  );

  return <Tabs activeTabId={activeTabId} size={'md'} tabs={tabs} onTabClick={onTabClick} />;
});

const Header = () => {
  return (
    <div className={'flex flex-col gap-10'}>
      <Name suspenseLines={1} />
      <ProfileTabs suspenseLines={1} />
    </div>
  );
};

export const Profile = wrapPage(() => {
  const activeTabId = useValue<TabId>('profile.tabs/active-tab-id');
  let tab;

  switch (activeTabId) {
    case 'actions':
      tab = <Actions suspenseLines={10} />;
      break;
    case 'issues':
      tab = <Issues suspenseLines={10} />;
      break;
    default:
      tab = <Actions suspenseLines={10} />;
  }

  return (
    <div className={'flex flex-col gap-10'}>
      <Header />
      {tab}
    </div>
  );
});

export const routes = {
  'profile/view': Profile,
};
