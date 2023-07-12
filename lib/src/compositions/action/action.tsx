import { Discuss } from '@elements/compositions/discuss';
import { Header } from '@elements/compositions/action/header';
import { Home } from '@elements/compositions/action/home';
import { Updates } from '@elements/compositions/updates';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';

type TabId = 'home' | 'discuss' | 'updates';

export const Action = wrapPage(() => {
  const activeTabId = useValue<TabId>('action.tabs/active-tab-id');
  const actionId = useValue<string>('current.action/id');
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home suspense={{ lines: 12 }} />;
      break;
    case 'updates':
      tab = (
        <Updates refAttribute={'entity.type/action'} refId={actionId} suspense={{ lines: 12 }} />
      );
      break;
    case 'discuss':
      tab = (
        <Discuss refAttribute={'entity.type/action'} refId={actionId} suspense={{ lines: 12 }} />
      );
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
  'action/view': Action,
};
