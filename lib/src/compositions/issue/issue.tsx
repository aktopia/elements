import { Header } from '@elements/compositions/issue/header';
import { Home } from '@elements/compositions/issue/home';
import { Discuss } from '@elements/compositions/discuss';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';

type TabId = 'home' | 'discuss' | 'media' | 'locations';

export const Issue = wrapPage(() => {
  const activeTabId = useValue<TabId>('issue.tabs/active-tab-id');
  const issueId = useValue<string>('current.issue/id');
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home suspense={{ lines: 12 }} />;
      break;
    case 'discuss':
      tab = <Discuss refAttribute={'entity.type/issue'} refId={issueId} suspense={{ lines: 12 }} />;
      break;
    default:
      tab = <Home suspense={{ lines: 12 }} />;
  }

  return (
    <div className={'flex flex-col gap-10'}>
      <Header />
      {tab}
    </div>
  );
});

export const routes = {
  'issue/view': Issue,
};
