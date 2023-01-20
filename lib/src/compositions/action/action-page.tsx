import React from 'react';
import { FollowButton } from '@elements/components/follow-button';
import { SaveButton } from '@elements/components/save-button';
import { Button } from '@elements/components/button';
import { BoltOutline } from '@elements/_icons';

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

export const ActionPage = ({ onTitleEdit, titleText }: any) => {
  return (
    <div>
      <Tracking />
      <div className={'flex'}>
        <div className={'mr-auto'}>
          <Title value={titleText} onEdit={onTitleEdit} />
        </div>
        <ActionBar />
      </div>
    </div>
  );
};
