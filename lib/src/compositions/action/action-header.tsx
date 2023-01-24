import { BoltOutline, Giving } from '@elements/_icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { SaveButton } from '@elements/components/save-button';
import { Tabs } from '@elements/components/tabs';
import { useDispatch, useValue } from '@elements/store';
import { memo, useCallback } from 'react';

export const SubscriptionBar = memo(() => {
  const actionId = useValue('action/id');
  const userId = useValue('user.me/id');
  const followCount = useValue('action.follow/count', { 'action/id': actionId });

  const ident = { 'user/id': userId, 'action/id': actionId };

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
  }, [followed]);

  const onSaveButtonClick = useCallback(() => {
    if (saved) {
      unSave(ident);
    } else {
      save(ident);
    }
  }, [saved]);

  return (
    <div className={'flex gap-4'}>
      <FollowButton
        kind="tertiary"
        size="xs"
        count={followCount}
        onClick={onFollowButtonClick}
        clicked={followed}
      />
      <SaveButton kind="tertiary" size="xs" onClick={onSaveButtonClick} clicked={saved} />
    </div>
  );
});

export const Title = memo(({ onEdit, value }: any) => {
  console.log(onEdit);
  return <h2 className={'text-2xl font-bold text-gray-900'}>{value}</h2>;
});

export const TimeAgo = memo(({ lastUpdated }: any) => {
  console.log(lastUpdated);
  return <div className={'text-xs text-gray-500'}>Active 5 days ago</div>;
});

const ActionBar = memo(({ onBump, onFund, bumpCount, bumped }: any) => {
  return (
    <div className={'flex gap-4'}>
      <Button
        Icon={BoltOutline}
        value={'Bump'}
        kind="secondary"
        size="md"
        clicked={bumped}
        onClick={onBump}
        count={bumpCount}
      />
      <Button value={'Fund'} kind="primary" size="md" onClick={onFund} Icon={Giving} />
    </div>
  );
});

export const Progress = memo(
  ({ activeSwitchId, switches, onSwitchClick, workPercentage, fundingPercentage }: any) => {
    console.log(fundingPercentage);
    return (
      <div className={'flex flex-col gap-2'}>
        <div className={'flex items-end justify-between'}>
          <NamedSwitch
            activeSwitchId={activeSwitchId}
            switches={switches}
            onSwitchClick={onSwitchClick}
            size="xs"
          />
          <div className={'flex gap-1 text-xs text-gray-500'}>
            <span className={'font-bold'}>{`${workPercentage}%`}</span>
            <span>Complete</span>
          </div>
        </div>
        <ProgressBar total={100} current={workPercentage} />
      </div>
    );
  }
);

export const ActionHeader = ({
  onBump,
  onFund,
  bumpCount,
  bumped,
  lastUpdated,
  titleText,
  onTitleEdit,
  tabs,
  activeTabId,
  progressBarActiveSwitchId,
  progressBarSwitches,
  onSwitchClick,
  workPercentage,
  onTabClick,
  fundingPercentage,
}: any) => {
  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex flex-col gap-8'}>
        <div className={'flex flex-col gap-4'}>
          <SubscriptionBar />
          <div>
            <div className={'flex'}>
              <div className={'mr-auto'}>
                <Title value={titleText} onEdit={onTitleEdit} />
              </div>
              <ActionBar onBump={onBump} onFund={onFund} bumpCount={bumpCount} bumped={bumped} />
            </div>
            <TimeAgo lastUpdated={lastUpdated} />
          </div>
        </div>
        <Progress
          activeSwitchId={progressBarActiveSwitchId}
          switches={progressBarSwitches}
          onSwitchClick={onSwitchClick}
          workPercentage={workPercentage}
          fundingPercentage={fundingPercentage}
        />
      </div>
      <div className={'flex justify-center'}>
        <Tabs size="md" tabs={tabs} activeTabId={activeTabId} onTabClick={onTabClick} />
      </div>
    </div>
  );
};
