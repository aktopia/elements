import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { Timestamp } from '@elements/components/timestamp';
import { EntityType } from '@elements/compositions/entity-type';
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

export const LastActive = suspensify(() => {
  const actionId = useValue('current.issue/id');
  const lastActive = useValue<number>('issue/last-active-at', { 'issue/id': actionId });
  return (
    <Timestamp
      className={'text-xs text-gray-400'}
      // TODO i18n
      prefix={'Active'}
      relative={true}
      timestamp={lastActive}
    />
  );
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
      <div className={'flex flex-col items-start gap-4'}>
        <div className={'mr-5 h-full w-full'}>
          <Title suspense={{ lines: 1, lineHeight: '36' }} />
        </div>
        <div className={'flex items-center gap-5'}>
          <EntityType type={'issue'} />
          <LastActive suspense={{ lines: 1 }} />
        </div>
      </div>
      <IssueTabs suspense={{ lines: 1 }} />
    </div>
  );
};
