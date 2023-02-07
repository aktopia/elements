import { BoltOutline, Giving } from '@elements/_icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { ISwitch, NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { SaveButton } from '@elements/components/save-button';
import { Tab, Tabs } from '@elements/components/tabs';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo, useCallback, useMemo } from 'react';

export const SubscriptionBar = memo(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);
  const followCount = useValue<number>('action.follow/count', { 'action/id': actionId });
  const saved = useValue<boolean>('action/saved', ident);
  const followed = useValue<boolean>('action/followed', ident);
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
        clicked={followed}
        count={followCount}
        kind={'tertiary'}
        size={'xs'}
        onClick={onFollowButtonClick}
      />
      <SaveButton clicked={saved} kind={'tertiary'} size={'xs'} onClick={onSaveButtonClick} />
    </div>
  );
});

export const Title = memo(() => {
  const actionId = useValue('current.action/id');
  const title = useValue<string>('action/title', { 'action/id': actionId });
  return <h2 className={'text-2xl font-bold text-gray-900'}>{title}</h2>;
});

export const TimeAgo = memo(() => {
  const actionId = useValue('current.action/id');
  const lastActive = useValue<number>('action/last-active', { 'action/id': actionId });
  // TODO Format lastActive
  return <div className={'text-xs text-gray-500'}>{lastActive}</div>;
});

const ActionBar = memo(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);
  const bumped = useValue<boolean>('action/bumped', ident);
  const bumpCount = useValue<number>('action.bump/count', { 'action/id': actionId });
  const bump = useDispatch('action/bump');
  const unBump = useDispatch('action/unbump');
  const navigateToFunding = useDispatch('action/fund');

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
        clicked={bumped}
        count={bumpCount}
        kind={'secondary'}
        size={'md'}
        value={'Bump'}
        onClick={onBumpButtonClick}
      />
      <Button
        Icon={Giving}
        kind={'primary'}
        size={'md'}
        value={'Fund'}
        onClick={onFundButtonClick}
      />
    </div>
  );
});

export const ProgressIndicator = memo(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const activeSwitchId = useValue<string>('action.progress-bar/active-switch-id');
  const workPercentage = useValue<number>('action.work/percentage', { 'action/id': actionId });
  const fundingPercentage = useValue('action.funding/percentage', { 'action/id': actionId });
  const switches = useValue<ISwitch[]>('action.progress-bar/switches');
  const updateSwitch = useDispatch('action.progress-bar/update');
  const workPercentageText = `${workPercentage}%`;

  const onSwitchClick = useCallback(
    (switchId: string) => {
      updateSwitch({ 'switch/id': switchId });
    },
    [updateSwitch]
  );

  fundingPercentage;

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex items-end justify-between'}>
        <NamedSwitch
          activeSwitchId={activeSwitchId}
          size={'xs'}
          switches={switches}
          onSwitchClick={onSwitchClick}
        />
        <div className={'flex gap-1 text-xs text-gray-500'}>
          <span className={'font-bold'}>{workPercentageText}</span>
          <span>{t('percentage/complete')}</span>
        </div>
      </div>
      <ProgressBar current={workPercentage} total={100} />
    </div>
  );
});

export const ActionTabs = () => {
  const tabs = useValue<Tab[]>('action/tabs');
  const activeTabId = useValue<string>('action.tabs/active-tab-id');
  const updateTab = useDispatch('action.tabs/update');

  const onTabClick = useCallback(
    (tabId: string) => {
      updateTab({ 'tab/id': tabId });
    },
    [updateTab]
  );

  return <Tabs activeTabId={activeTabId} size={'md'} tabs={tabs} onTabClick={onTabClick} />;
};

export const Header = () => {
  return (
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
};
