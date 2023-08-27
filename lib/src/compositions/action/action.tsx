import { Discuss } from '@elements/compositions/discuss';
import { Header } from '@elements/compositions/action/header';
import { Home } from '@elements/compositions/action/home';
import { Updates } from '@elements/compositions/updates';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';

export const Action = wrapPage(() => {
  const activeTabId = useValue('action.tabs/active-tab');
  const actionId = useValue('current.action/id');
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home suspenseLines={12} />;
      break;
    case 'updates':
      tab = <Updates refAttribute={'entity.type/action'} refId={actionId} suspenseLines={12} />;
      break;
    case 'discuss':
      tab = <Discuss refAttribute={'entity.type/action'} refId={actionId} suspenseLines={12} />;
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
