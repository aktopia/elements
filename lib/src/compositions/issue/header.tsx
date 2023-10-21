import { FollowButton } from '@elements/components/follow-button';
import { QRCodeButton } from '@elements/components/qr-code-button';
import { RaiseHand as RawRaiseHand } from '@elements/components/raise-hand';
import { SaveButton } from '@elements/components/save-button';
import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { SeveritySlider } from '@elements/compositions/issue/severity-slider';
import { Voting as RawVoting } from '@elements/compositions/voting';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';
import { EntityType as Type } from '@elements/types';
import { Locality, LocalitySlideOver } from '@elements/compositions/issue/locality';
import { LastActive } from '@elements/compositions/last-active';
import { updateHashParams } from '@elements/router';
import { WrapComingSoonPopover } from '@elements/components/coming-soon-popover';
import { useWrapRequireAuth } from '@elements/store/hooks';
import { Status } from '@elements/logic/meta/initiative';

const Title = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const title = useValue('issue.title/text', { 'issue/id': issueId });
  const canEdit = useValue('issue.title/can-edit');

  const onEdit = useDispatch('issue.title/edit');

  return (
    <div className={'flex items-start justify-between gap-2'}>
      <TextEditor
        className={'text-3xl font-semibold text-gray-800'}
        content={title}
        output={'text'}
        refAttribute={'issue.title/text'}
        refId={issueId}
        richText={false}
        suspenseLines={1}
      />
      <EditButton
        canEdit={canEdit}
        className={'mt-2 h-5 w-5 text-gray-500'}
        suspenseLines={1}
        onEdit={onEdit}
      />
    </div>
  );
});

export const SubscriptionBar = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const userId = useValue('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'issue/id': issueId }), [userId, issueId]);
  const followCount = useValue('issue.follow/count', { 'issue/id': issueId });
  const saved = useValue('issue/saved', ident);
  const followed = useValue('issue/followed', ident);
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
      <WrapComingSoonPopover id={'issue-share'} size={'sm'} status={Status.Evaluating}>
        <QRCodeButton kind={'tertiary'} size={'xs'} />
      </WrapComingSoonPopover>
      <WrapComingSoonPopover id={'issue-follow'} size={'sm'} status={Status.Evaluating}>
        <FollowButton
          clicked={followed}
          count={followCount}
          kind={'tertiary'}
          size={'xs'}
          onClick={onFollowButtonClick}
        />
      </WrapComingSoonPopover>
      <WrapComingSoonPopover id={'issue-save'} size={'sm'} status={Status.Evaluating}>
        <SaveButton clicked={saved} kind={'tertiary'} size={'xs'} onClick={onSaveButtonClick} />
      </WrapComingSoonPopover>
    </div>
  );
});

export const IssueTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue('issue.tabs/active-tab');
  const tabs = useMemo(
    () => [
      { id: 'home', label: t('common/home') },
      { id: 'media', label: t('common/media') },
      { id: 'locations', label: t('common/locations') },
      { id: 'discuss', label: t('common/discuss') },
    ],
    [t]
  );

  const onTabClick = useCallback((tabId: string) => {
    updateHashParams({ tab: tabId }, { replace: true });
  }, []);

  return <Tabs activeTabId={activeTabId} size={'lg'} tabs={tabs} onTabClick={onTabClick} />;
});

const Voting = suspensify(() => {
  const issueId = useValue('current.issue/id');

  return <RawVoting lookupRef={issueId} size={'md'} suspenseLines={2} />;
});

const RaiseHand = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const count = useValue('issue.users.facing/count', { 'issue/id': issueId });
  const raised = useValue('issue.current.user/facing', { 'issue/id': issueId });

  const raiseHand = useDispatch('issue.current.user/face') as () => void;
  const onClick = useWrapRequireAuth(raiseHand, [raiseHand]);

  return <RawRaiseHand count={count} raised={raised} size={'md'} onClick={onClick} />;
});

const ActionBar = () => {
  return (
    <div className={'flex gap-12'}>
      <Voting suspenseLines={1} />
      <RaiseHand suspenseLines={1} />
    </div>
  );
};

export const Header = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const updatedAt = useValue('issue/updated-at', { 'issue/id': issueId });

  return (
    <>
      <div className={'flex flex-col gap-16'}>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex flex-col gap-8'}>
            <div
              className={'flex md:flex-row flex-col-reverse gap-5 items-baseline justify-between'}>
              <div className={'flex items-center gap-7'}>
                <EntityTypeBadge size={'sm'} type={Type.Issue} />
                <LastActive timestamp={updatedAt} />
                <Locality issueId={issueId} />
              </div>
              <SubscriptionBar suspenseLines={1} />
            </div>
            <div className={'flex flex-col items-start gap-10'}>
              <div className={'flex h-full w-full flex-col gap-7'}>
                <div className={'h-full w-full'}>
                  <Title suspenseLineHeight={'36'} suspenseLines={1} />
                </div>
              </div>
              <ActionBar />
            </div>
          </div>
          <SeveritySlider suspenseLines={1} />
        </div>
        <IssueTabs suspenseLines={1} />
      </div>
      <LocalitySlideOver issueId={issueId} />
    </>
  );
});
