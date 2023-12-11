import { Discuss } from '@elements/compositions/discuss';
import { IssueHeader } from '@elements/compositions/issue/issue-header';
import { IssueHome } from '@elements/compositions/issue/issue-home';
import { Spots } from '@elements/compositions/issue/spots';
import { Media } from '@elements/compositions/issue/media';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useIdent } from '@elements/store/hooks';
import { IssueTab } from '@elements/logic/issue';

export const Issue = wrapPage(() => {
  const activeTabId = useValue('issue.tabs/active-tab');
  const issueId = useValue('current.issue/id');
  const ref = useIdent('issue/id', issueId);
  let tab;

  switch (activeTabId) {
    case IssueTab.Home:
      tab = <IssueHome suspenseLines={12} />;
      break;
    case IssueTab.Discuss:
      tab = <Discuss lookupRef={ref} suspenseLines={12} />;
      break;
    case IssueTab.Media:
      tab = <Media issueId={issueId} />;
      break;
    case IssueTab.Spots:
      tab = <Spots refId={issueId} suspenseLines={5} />;
      break;
    default:
      tab = <IssueHome suspenseLines={12} />;
  }

  return (
    <div className={'flex flex-col gap-16'}>
      <IssueHeader />
      {tab}
    </div>
  );
});

export default Issue;
