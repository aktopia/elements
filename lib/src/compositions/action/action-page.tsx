import { BoltOutline, Giving } from '@elements/_icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { SaveButton } from '@elements/components/save-button';
import { Tabs } from '@elements/components/tabs';
import React from 'react';

// interface ActionPageProps {}

const Tracking = React.memo(({ followCount, onFollow, onSave, saved, followed }: any) => {
  return (
    <div className={'flex gap-4'}>
      <FollowButton
        kind="tertiary"
        size="xs"
        count={followCount}
        onClick={onFollow}
        clicked={followed}
      />
      <SaveButton kind="tertiary" size="xs" onClick={onSave} clicked={saved} />
    </div>
  );
});

export const Title = React.memo(({ onEdit, value }: any) => {
  console.log(onEdit);
  return <h2 className={'text-2xl font-bold text-gray-900'}>{value}</h2>;
});

export const TimeAgo = React.memo(({ lastUpdated }: any) => {
  console.log(lastUpdated);
  return <div className={'text-xs text-gray-500'}>Active 5 days ago</div>;
});

const ActionBar = React.memo(({ onBump, onFund, bumpCount, bumped }: any) => {
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

export const Progress = React.memo(
  ({ activeSwitchId, switches, onSwitchClick, workPercentage }: any) => {
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

export const ActionPage = ({
  onBump,
  onFund,
  bumpCount,
  bumped,
  lastUpdated,
  titleText,
  onTitleEdit,
  followCount,
  onFollow,
  onSave,
  followed,
  saved,
  tabs,
  activeTabId,
  progressBarActiveSwitchId,
  progressBarSwitches,
  onSwitchClick,
  workPercentage,
  onTabClick,
}: any) => {
  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex flex-col gap-8'}>
        <div className={'flex flex-col gap-4'}>
          <Tracking
            followCount={followCount}
            onFollow={onFollow}
            onSave={onSave}
            saved={saved}
            followed={followed}
          />
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
        />
      </div>
      <div className={'flex justify-center'}>
        <Tabs size="md" tabs={tabs} activeTabId={activeTabId} onTabClick={onTabClick} />
      </div>
    </div>
  );
};
