import { Crowd, Giving } from '@elements/icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { QRCodeButton } from '@elements/components/qr-code-button';
import { SaveButton } from '@elements/components/save-button';
import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { TextEditor } from '@elements/compositions/text-editor';
import { Voting } from '@elements/compositions/voting';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';
import { EntityType as Type } from '@elements/types';
import { Locality, LocalitySlideOver } from '@elements/compositions/action/locality';
import { LastActive } from '@elements/compositions/last-active';
import { updateHashParams } from '@elements/router';
import { WrapComingSoonPopover } from '@elements/components/coming-soon-popover';
import { Status } from '@elements/logic/meta/initiative';
import type { SwitchId } from '@elements/logic/action';
import { useLookupRef } from '@elements/store/hooks';
import { cva } from 'cva';
import { ActionStatus as ActionStatusEnum } from '@elements/logic/action';

export const SubscriptionBar = suspensify(() => {
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
      <WrapComingSoonPopover id={'action-share'} size={'sm'} status={Status.Evaluating}>
        <QRCodeButton kind={'tertiary'} size={'xs'} />
      </WrapComingSoonPopover>
      <WrapComingSoonPopover id={'action-follow'} size={'sm'} status={Status.Evaluating}>
        <FollowButton
          clicked={followed}
          count={followCount}
          kind={'tertiary'}
          size={'xs'}
          onClick={onFollowButtonClick}
        />
      </WrapComingSoonPopover>
      <WrapComingSoonPopover id={'action-save'} size={'sm'} status={Status.Evaluating}>
        <SaveButton clicked={saved} kind={'tertiary'} size={'xs'} onClick={onSaveButtonClick} />
      </WrapComingSoonPopover>
    </div>
  );
});

const Title = suspensify(() => {
  const actionId = useValue('current.action/id');
  const title = useValue('action.title/text', { 'action/id': actionId });

  const canEdit = useValue('action.title/can-edit', { 'action/id': actionId });
  const onEdit = useDispatch('action.title/edit');

  return (
    <div className={'flex items-start justify-between gap-3'}>
      <TextEditor
        className={'text-3xl font-semibold text-gray-800'}
        content={title}
        output={'text'}
        refAttribute={'action.title/text'}
        refId={actionId}
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

export const ActionBar = suspensify(() => {
  const actionId = useValue('current.action/id');
  const userId = useValue('current.user/id');

  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);

  const lookupRef = useLookupRef('action/id', actionId);
  const volunteer = useDispatch('action/volunteer');
  const navigateToFunding = useDispatch('action/fund');

  const onVolunteerButtonClick = useCallback(() => {
    volunteer(ident);
  }, [volunteer, ident]);

  const onFundButtonClick = useCallback(() => {
    navigateToFunding(ident);
  }, [navigateToFunding, ident]);

  return (
    <div className={'flex gap-10 md:flex-row flex-col'}>
      <Voting lookupRef={lookupRef} size={'md'} suspenseLines={1} />
      <div className={'flex gap-10'}>
        <WrapComingSoonPopover id={'action-funding'} status={Status.Planning}>
          <Button
            Icon={Giving}
            containerClassName={'w-32'}
            kind={'primary'}
            size={'md'}
            value={'Fund'}
            onClick={onFundButtonClick}
          />
        </WrapComingSoonPopover>
        <WrapComingSoonPopover id={'action-volunteering'} status={Status.Planning}>
          <Button
            Icon={Crowd}
            kind={'secondary'}
            size={'md'}
            value={'Volunteer'}
            onClick={onVolunteerButtonClick}
          />
        </WrapComingSoonPopover>
      </div>
    </div>
  );
});

export const ProgressIndicator = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const activeSwitchId = useValue('action.progress-bar.switches/active-switch');
  const workPercentage = useValue('action.work/percentage', { 'action/id': actionId });
  const fundingPercentage = useValue('action.funding/percentage', { 'action/id': actionId });
  const updateSwitch = useDispatch('action.progress-bar.switches/update');
  const workPercentageText = `${workPercentage}%`;
  const fundingPercentageText = `${fundingPercentage}%`;

  const switches = useMemo(
    () => [
      { id: 'work', label: 'Work' },
      { id: 'funding', label: 'Funding' },
    ],
    []
  );

  const onSwitchClick = useCallback(
    (switchId: SwitchId) => {
      updateSwitch({ 'switch/id': switchId });
    },
    [updateSwitch]
  );

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex items-end justify-between'}>
        <NamedSwitch
          activeSwitchId={activeSwitchId}
          size={'xs'}
          switches={switches}
          onSwitchClick={onSwitchClick}
        />
        {activeSwitchId === 'work' ? (
          <div className={'flex gap-1 text-xs text-gray-500'}>
            <span className={'font-bold'}>{workPercentageText}</span>
            <span>{t('percentage/complete')}</span>
          </div>
        ) : (
          <div className={'flex gap-1 text-xs text-gray-500'}>
            <span className={'font-bold'}>{fundingPercentageText}</span>
            <span>{t('percentage/funded')}</span>
          </div>
        )}
      </div>
      {activeSwitchId === 'work' ? (
        <ProgressBar barClassName={'bg-green-500'} current={workPercentage} total={100} />
      ) : (
        <ProgressBar barClassName={'bg-blue-500'} current={fundingPercentage} total={100} />
      )}
    </div>
  );
});

export const ActionTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue('action.tabs/active-tab');
  const tabs = useMemo(
    () => [
      { id: 'home', label: t('common/home') },
      // { id: 'funding', label: t('common/funding') },
      { id: 'updates', label: t('common/updates') },
      { id: 'discuss', label: t('common/discuss') },
      // { id: 'team', label: t('common/team') },
    ],
    [t]
  );

  const onTabClick = useCallback((tabId: string) => {
    updateHashParams({ tab: tabId }, { replace: true });
  }, []);

  return <Tabs activeTabId={activeTabId} size={'lg'} tabs={tabs} onTabClick={onTabClick} />;
});

const statusContainerVariant = cva(
  'flex items-center gap-2 border pl-2 pr-2.5 py-1 rounded-full shadow bg-white',
  {
    variants: {
      color: {
        gray: 'border-gray-400',
        blue: 'border-blue-500',
        green: 'border-green-600',
        indigo: 'border-indigo-600',
        lime: 'border-lime-600',
        orange: 'border-orange-600',
        teal: 'border-teal-600',
        sky: 'border-sky-600',
      },
    },
  }
);

const statusDotVariant = cva('w-3 h-3 rounded-full', {
  variants: {
    color: {
      gray: 'bg-gray-400',
      blue: 'bg-blue-500',
      green: 'bg-green-600',
      indigo: 'bg-indigo-600',
      lime: 'bg-lime-600',
      orange: 'bg-orange-600',
      teal: 'bg-teal-600',
      sky: 'bg-sky-600',
    },
  },
});

const statusTextVariant = cva('text-xs font-medium', {
  variants: {
    color: {
      gray: 'text-gray-500',
      blue: 'text-blue-600',
      green: 'text-green-600',
      indigo: 'text-indigo-600',
      lime: 'text-lime-600',
      orange: 'text-orange-600',
      teal: 'text-teal-600',
      sky: 'text-sky-600',
    },
  },
});

type Colors = 'gray' | 'blue' | 'green' | 'indigo' | 'lime' | 'orange';

const colorMapping: Record<ActionStatusEnum, Colors> = {
  [ActionStatusEnum.Draft]: 'gray',
  [ActionStatusEnum.Reviewing]: 'blue',
  [ActionStatusEnum.Active]: 'green',
  [ActionStatusEnum.Completed]: 'indigo',
};

const ActionStatus = suspensify(() => {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const status = useValue('action/status', { 'action/id': actionId });
  const color = colorMapping[status];

  return (
    <button className={statusContainerVariant({ color })} type={'button'}>
      <div className={statusDotVariant({ color })} />
      <p className={statusTextVariant({ color })}>{t(status)}</p>
    </button>
  );
});

export const Header = suspensify(() => {
  const actionId = useValue('current.action/id');
  const updatedAt = useValue('action/updated-at', { 'action/id': actionId });

  return (
    <>
      <div className={'flex flex-col gap-16'}>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex flex-col gap-8 items-start w-full'}>
            <div
              className={
                'flex md:flex-row flex-col-reverse gap-5 items-baseline justify-between w-full'
              }>
              <div className={'flex gap-7 flex-wrap'}>
                <EntityTypeBadge size={'sm'} type={Type.Action} />
                <LastActive timestamp={updatedAt} />
                <ActionStatus />
              </div>
              <SubscriptionBar suspenseLines={2} />
            </div>
            <Locality actionId={actionId} />
            <div className={'flex flex-col gap-10 w-full'}>
              <div className={'mr-5'}>
                <Title suspenseLineHeight={'36'} suspenseLines={1} />
              </div>
              <ActionBar suspenseLines={2} />
            </div>
          </div>
          <ProgressIndicator suspenseLines={1} />
        </div>
        <ActionTabs suspenseLines={1} />
      </div>
      <LocalitySlideOver actionId={actionId} />
    </>
  );
});
