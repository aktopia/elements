import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

const Title = suspensify(() => {
  const issueId = useValue<string>('current.issue/id');
  const title = useValue<string>('issue/title', { 'issue/id': issueId });

  return (
    <TextEditor
      className={'text-2xl font-bold text-gray-800'}
      content={title}
      refAttribute={'issue.title/text'}
      refId={issueId}
      suspense={{ lines: 1 }}
    />
  );
});

export const TimeAgo = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const lastActive = useValue<number>('issue/last-active', { 'issue/id': issueId });
  // TODO Format lastActive
  return <div className={'text-xs text-gray-500'}>{lastActive}</div>;
});

export const IssueTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue<string>('issue.tabs/active-tab-id');
  const updateTab = useDispatch('issue.tabs/update');
  const tabs = useMemo(
    () => [
      { id: 'home', label: t('common/home') },
      { id: 'media', label: t('common/media') },
      { id: 'locations', label: t('common/locations') },
      { id: 'discuss', label: t('common/discuss') },
    ],
    [t]
  );

  const onTabClick = useCallback(
    (tabId: string) => {
      updateTab({ 'tab/id': tabId });
    },
    [updateTab]
  );

  return <Tabs activeTabId={activeTabId} size={'md'} tabs={tabs} onTabClick={onTabClick} />;
});

export const Header = () => {
  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'mr-5 h-full w-full'}>
        <Title suspense={{ lines: 1, lineHeight: '36' }} />
      </div>
      <IssueTabs suspense={{ lines: 1 }} />
    </div>
  );
};
