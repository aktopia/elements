import { Discuss } from '@elements/compositions/discuss';
import { ActionHeader } from '@elements/compositions/action/action-header';
import { Home } from '@elements/compositions/action/home';
import { Updates } from '@elements/compositions/updates';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useLookupRef } from '@elements/store/hooks';

export const Action = wrapPage(() => {
  const activeTabId = useValue('action.tabs/active-tab');
  const actionId = useValue('current.action/id');
  const ref = useLookupRef('action/id', actionId);
  let tab;

  switch (activeTabId) {
    case 'home':
      tab = <Home suspenseLines={12} />;
      break;
    case 'updates':
      tab = <Updates lookupRef={ref} suspenseLines={12} />;
      break;
    case 'discuss':
      tab = <Discuss lookupRef={ref} suspenseLines={12} />;
      break;
    default:
      tab = <Home suspenseLines={12} />;
  }

  return (
    <div className={'flex flex-col gap-16'}>
      <ActionHeader />
      {tab}
    </div>
  );
});
