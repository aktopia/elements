import { Discuss } from '@elements/compositions/discuss';
import { IssueHeader } from '@elements/compositions/issue/issue-header';
import { Home } from '@elements/compositions/issue/home';
import { Spots } from '@elements/compositions/issue/spots';
import { Media } from '@elements/compositions/issue/media';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useLookupRef } from '@elements/store/hooks';

export const Issue = wrapPage(() => {
  const activeTabId = useValue('issue.tabs/active-tab');
  const issueId = useValue('current.issue/id');
  const ref = useLookupRef('issue/id', issueId);
  let tab;

  switch (activeTabId) {
    case 'issue.tab/home':
      tab = <Home suspenseLines={12} />;
      break;
    case 'issue.tab/discuss':
      tab = <Discuss lookupRef={ref} suspenseLines={12} />;
      break;
    case 'issue.tab/media':
      tab = <Media issueId={issueId} />;
      break;
    case 'issue.tab/spots':
      tab = <Spots refId={issueId} suspenseLines={5} />;
      break;
    default:
      tab = <Home suspenseLines={12} />;
  }

  return (
    <div className={'flex flex-col gap-16'}>
      <IssueHeader />
      {tab}
    </div>
  );
});
