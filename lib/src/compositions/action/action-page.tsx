import React from 'react';
import { FollowButton } from '@elements/components/follow-button';
import { SaveButton } from '@elements/components/save-button';
import { Button } from '@elements/components/button';
import { BoltOutline } from '@elements/_icons';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';

// interface IActionPage {}

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

export const TimeAgo = React.memo(({}: any) => {
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
      <Button value={'Fund'} kind="primary" size="md" onClick={onFund} />
    </div>
  );
});

export const Progress = React.memo(({}: any) => {
  return (
    <div className={'flex flex-col gap-1'}>
      <NamedSwitch
        activeSwitch={'work'}
        switches={[
          { id: 'work', label: 'Work' },
          { id: 'funding', label: 'Funding' },
        ]}
        onSwitchClick={() => {}}
        size="xs"
      />
      <ProgressBar total={100} current={23} />
    </div>
  );
});

export const ActionPage = ({ onTitleEdit, titleText }: any) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Tracking />
      <div className={'flex'}>
        <div className={'mr-auto'}>
          <Title value={titleText} onEdit={onTitleEdit} />
        </div>
        <ActionBar />
      </div>
      <TimeAgo />
      <Progress />
    </div>
  );
};
