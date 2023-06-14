import { Discussion } from '@elements/compositions/action/discussion';
import { Header } from '@elements/compositions/action/header';
import { HomeSection } from '@elements/compositions/action/home-section';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useRef } from 'react';

type TabId = 'home' | 'discussion';
export const Action = wrapPage(() => {
  const tabsRef = useRef({ home: <HomeSection />, discussion: <Discussion suspenseLines={12} /> });
  const activeTabId = useValue<TabId>('action.tabs/active-tab-id');

  return (
    <div className={'flex flex-col gap-6'}>
      <Header />
      {tabsRef.current[activeTabId]}
    </div>
  );
});

export const routes = {
  'action/view': <Action />,
};
