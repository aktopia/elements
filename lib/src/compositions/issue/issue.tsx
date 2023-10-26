import { Discuss } from '@elements/compositions/discuss';
import { Header } from '@elements/compositions/issue/header';
import { Home } from '@elements/compositions/issue/home';
import { Locations } from '@elements/compositions/issue/locations';
import { Media } from '@elements/compositions/issue/media';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useMemo } from 'react';
import type { LookupRef } from '@elements/types';

export const Issue = wrapPage(() => {
  const activeTabId = useValue('issue.tabs/active-tab');
  const issueId = useValue('current.issue/id');
  const ref = useMemo(() => ['issue/id', issueId] as LookupRef, [issueId]);
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home suspenseLines={12} />;
      break;
    case 'discuss':
      tab = <Discuss lookupRef={ref} suspenseLines={12} />;
      break;
    case 'media':
      tab = <Media suspenseLines={8} />;
      break;
    case 'locations':
      tab = <Locations refId={issueId} suspenseLines={5} />;
      break;
    default:
      tab = <Home suspenseLines={12} />;
  }

  return (
    <div className={'flex flex-col gap-16'}>
      <Header />
      {tab}
    </div>
  );
});

export const routes = {
  'issue/view': Issue,
};
