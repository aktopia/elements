import { BoltOutline, Giving } from '@elements/_icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { SaveButton } from '@elements/components/save-button';
import { Tabs } from '@elements/components/tabs';
import { useDispatch, useValue } from '@elements/store';
import { memo, useCallback, useMemo } from 'react';

export const SubscriptionBar = memo(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);
  const followCount = useValue('action.follow/count', { 'action/id': actionId });
  const saved = useValue('action/saved', ident);
  const followed = useValue('action/followed', ident);
  const follow = useDispatch('action/follow');
  const unFollow = useDispatch('action/unfollow');
  const save = useDispatch('action/save');
  const unSave = useDispatch('action/unsave');

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
        kind='tertiary'
        size='xs'
        count={followCount}
        onClick={onFollowButtonClick}
        clicked={followed}
      />
      <SaveButton kind='tertiary' size='xs' onClick={onSaveButtonClick} clicked={saved} />
    </div>
  );
});

export const Title = memo(() => {
  const actionId = useValue('current.action/id');
  const title = useValue('action/title', { 'action/id': actionId });
  return <h2 className={'text-2xl font-bold text-gray-900'}>{title}</h2>;
});

export const TimeAgo = memo(() => {
  const actionId = useValue('current.action/id');
  const lastActive = useValue('action/last-active', { 'action/id': actionId });
  console.log(lastActive);
  return <div className={'text-xs text-gray-500'}>Active 5 days ago</div>;
});

const ActionBar = memo(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);
  const bumped = useValue('action/bumped', ident);
  const bumpCount = useValue('action.bump/count', { 'action/id': actionId });
  const bump = useDispatch('action/bump');
  const unBump = useDispatch('action/unbump');
  const navigateToFunding = useDispatch('navigate.action/funding');

  const onBumpButtonClick = useCallback(() => {
    if (bumped) {
      unBump(ident);
    } else {
      bump(ident);
    }
  }, [bumped, bump, unBump, ident]);

  const onFundButtonClick = useCallback(() => {
    navigateToFunding(ident);
  }, [navigateToFunding, ident]);

  return (
    <div className={'flex gap-4'}>
      <Button
        Icon={BoltOutline}
        value={'Bump'}
        kind='secondary'
        size='md'
        clicked={bumped}
        onClick={onBumpButtonClick}
        count={bumpCount}
      />
      <Button value={'Fund'} kind='primary' size='md' onClick={onFundButtonClick} Icon={Giving} />
    </div>
  );
});

export const ProgressIndicator = memo(() => {
  const actionId = useValue('current.action/id');
  const activeSwitchId = useValue('ui.action.progress-bar/active-switch-id');
  const workPercentage = useValue('action.work/percentage', { 'action/id': actionId });
  const fundingPercentage = useValue('action.funding/percentage', { 'action/id': actionId });
  const switches = useValue('ui.action.progress-bar/switches');
  const updateSwitch = useDispatch('ui.action.progress-bar/update');

  const onSwitchClick = useCallback(
    (switchId: string) => {
      updateSwitch({ 'switch/id': switchId });
    },
    [updateSwitch],
  );

  console.log(fundingPercentage);

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex items-end justify-between'}>
        <NamedSwitch
          activeSwitchId={activeSwitchId}
          switches={switches}
          onSwitchClick={onSwitchClick}
          size='xs'
        />
        <div className={'flex gap-1 text-xs text-gray-500'}>
          <span className={'font-bold'}>{`${workPercentage}%`}</span>
          <span>Complete</span>
        </div>
      </div>
      <ProgressBar total={100} current={workPercentage} />
    </div>
  );
});

export const ActionTabs = () => {
  const tabs = useValue('ui.action/tabs');
  const activeTabId = useValue('ui.action.tabs/active-tab-id');
  const updateTab = useDispatch('ui.action.tabs/update');

  const onTabClick = useCallback(
    (tabId: string) => {
      updateTab({ 'tab/id': tabId });
    },
    [updateTab],
  );

  return <Tabs size='md' tabs={tabs} activeTabId={activeTabId} onTabClick={onTabClick} />;
};

export const ActionHeader = () => (
  <div className={'flex flex-col gap-10'}>
    <div className={'flex flex-col gap-8'}>
      <div className={'flex flex-col gap-4'}>
        <SubscriptionBar />
        <div>
          <div className={'flex'}>
            <div className={'mr-auto'}>
              <Title />
            </div>
            <ActionBar />
          </div>
          <TimeAgo />
        </div>
      </div>
      <ProgressIndicator />
    </div>
    <div className={'flex justify-center'}>
      <ActionTabs />
    </div>
  </div>
);
