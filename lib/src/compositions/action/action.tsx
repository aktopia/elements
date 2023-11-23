import { Discuss } from '@elements/compositions/discuss';
import { ActionHeader } from '@elements/compositions/action/action-header';
import { Home } from '@elements/compositions/action/home';
import { Updates } from '@elements/compositions/updates';
import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { useLookupRef } from '@elements/store/hooks';
import { NotFound } from '@elements/compositions/not-found';
import { ActionStatus, ActionTab } from '@elements/logic/action';
import { InformationCircleOutline } from '@elements/icons';
import { useTranslation } from '@elements/translation';

const Unavailable = ({ text }: { text: string }) => {
  return (
    <div className={'flex flex-col justify-center items-center gap-3'}>
      <InformationCircleOutline className={'h-9 w-9 text-gray-400'} />
      <p className={'text-gray-500 text-center'}>{text}</p>
    </div>
  );
};

const Action_ = ({ actionId }: { actionId: string }) => {
  const t = useTranslation();
  const activeTabId = useValue('action.tabs/active-tab');
  const ref = useLookupRef('action/id', actionId);
  const isDraft = useValue('action.status/check', {
    'action/id': actionId,
    in: [ActionStatus.Draft],
  });

  let tab;

  switch (activeTabId) {
    case ActionTab.Home:
      tab = <Home suspenseLines={12} />;
      break;
    case ActionTab.Updates:
      tab = isDraft ? (
        <Unavailable text={t('action.updates/unavailable')} />
      ) : (
        <Updates lookupRef={ref} suspenseLines={12} />
      );
      break;
    case ActionTab.Discuss:
      tab = isDraft ? (
        <Unavailable text={t('action.discussion/unavailable')} />
      ) : (
        <Discuss lookupRef={ref} suspenseLines={12} />
      );
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
};

export const Action = wrapPage(() => {
  const actionId = useValue('current.action/id');
  const actionExists = useValue('action/exists', { 'action/id': actionId });

  if (!actionExists) {
    return <NotFound />;
  }

  return <Action_ actionId={actionId} />;
});
