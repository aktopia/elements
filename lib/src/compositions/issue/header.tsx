import { FollowButton } from '@elements/components/follow-button';
import { QRCodeButton } from '@elements/components/qr-code-button';
import { RaiseHand } from '@elements/components/raise-hand';
import { SaveButton } from '@elements/components/save-button';
import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { Timestamp } from '@elements/components/timestamp';
import { Voting as RawVoting } from '@elements/compositions/voting';
import { EntityType } from '@elements/compositions/entity-type';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

export const SubscriptionBar = suspensify(() => {
  const issueId = useValue<string>('current.issue/id');
  const userId = useValue<string>('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'issue/id': issueId }), [userId, issueId]);
  const followCount = useValue<number>('issue.follow/count', { 'issue/id': issueId });
  const saved = useValue<boolean>('issue/saved', ident);
  const followed = useValue<boolean>('issue/followed', ident);
  const follow = useDispatch('issue/follow');
  const unFollow = useDispatch('issue/unfollow');
  const save = useDispatch('issue/save');
  const unSave = useDispatch('issue/unsave');

  const onFollowButtonClick = useCallback(() => {
    if (followed) {
      unFollow(ident);
    } else {
      follow(ident);
    }
  }, [followed, follow, unFollow, ident]);

  const onSaveButtonClick = useCallback(() => {
    if (saved) {
      unSave(ident);
    } else {
      save(ident);
    }
  }, [saved, save, unSave, ident]);

  return (
    <div className={'flex gap-4'}>
      <FollowButton
        clicked={followed}
        count={followCount}
        kind={'tertiary'}
        size={'xs'}
        onClick={onFollowButtonClick}
      />
      <SaveButton clicked={saved} kind={'tertiary'} size={'xs'} onClick={onSaveButtonClick} />
      <QRCodeButton kind={'tertiary'} size={'xs'} />
    </div>
  );
});

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
  const issueId = useValue('current.issue/id');
  const lastActive = useValue<number>('issue/last-active-at', { 'issue/id': issueId });
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

const Voting = suspensify(() => {
  const issueId = useValue<string>('current.issue/id');
  return (
    <RawVoting
      refAttribute={'entity.type/issue'}
      refId={issueId}
      size={'sm'}
      suspense={{ lines: 2 }}
    />
  );
});

const ActionBar = () => {
  return (
    <div className={'flex gap-6'}>
      <Voting suspense={{ lines: 1 }} />
      <RaiseHand count={5} raised={false} size={'sm'} onClick={console.log} />
    </div>
  );
};

export const Header = () => {
  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex flex-col gap-8'}>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex justify-between'}>
            <SubscriptionBar suspense={{ lines: 1 }} />
            <ActionBar />
          </div>
          <div className={'flex flex-col items-start gap-4'}>
            <div className={'mr-5 h-full w-full'}>
              <Title suspense={{ lines: 1, lineHeight: '36' }} />
            </div>
            <div className={'flex items-center gap-5'}>
              <EntityType type={'issue'} />
              <LastActive suspense={{ lines: 1 }} />
            </div>
          </div>
        </div>
      </div>
      <IssueTabs suspense={{ lines: 1 }} />
    </div>
  );
};
