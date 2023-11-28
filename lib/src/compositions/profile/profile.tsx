import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { Actions } from '@elements/compositions/profile/actions';
import { Issues } from '@elements/compositions/profile/issues';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { updateHashParams } from '@elements/router';
import type { TabId } from '@elements/logic/profile';

const Name = suspensify(() => {
  const userId = useValue('profile.user/id');
  const name = useValue('user/name', { 'user/id': userId });
  return <div className={'w-full text-4xl font-medium text-gray-700'}>{name}</div>;
});

const ProfileTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue('profile.tabs/active-tab');
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

  const onTabClick = useCallback((tabId: TabId) => {
    updateHashParams({ tab: tabId }, { replace: true });
  }, []);

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

const Profile = wrapPage(() => {
  const activeTabId = useValue('profile.tabs/active-tab');
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

export default Profile;
