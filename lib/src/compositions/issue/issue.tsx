import { Discuss } from '@elements/compositions/discuss';
import { Header } from '@elements/compositions/issue/header';
import { Home } from '@elements/compositions/issue/home';
import { Locations } from '@elements/compositions/issue/locations';
import { Media } from '@elements/compositions/issue/media';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';

type TabId = 'home' | 'discuss' | 'media' | 'locations';

export const Issue = wrapPage(() => {
  const activeTabId = useValue<TabId>('issue.tabs/active-tab-id');
  const issueId = useValue<string>('current.issue/id');
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home suspenseLines={12} />;
      break;
    case 'discuss':
      tab = <Discuss refAttribute={'entity.type/issue'} refId={issueId} suspenseLines={12} />;
      break;
    case 'media':
      tab = <Media suspenseLines={8} />;
      break;
    case 'locations':
      tab = <Locations refAttribute={'entity.type/action'} refId={issueId} suspenseLines={5} />;
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
