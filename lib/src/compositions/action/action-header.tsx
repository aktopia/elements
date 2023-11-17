import { Crowd, Giving, TrashOutline } from '@elements/icons';
import { Button } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { ShareButton } from '@elements/components/share-button';
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
import { ActionStatus } from '@elements/logic/action';
import { useIsCompactViewport, useLookupRef } from '@elements/store/hooks';
import { type ItemType } from '@elements/components/dropdown';
import { ContextMenu } from '@elements/components/context-menu';
import { ActionStatusButton, ActionStatusModal } from '@elements/compositions/action/action-status';

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
  const isCompactViewport = useIsCompactViewport();

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
        <ShareButton
          data-event-id={'action-share-button-click'}
          iconOnly={isCompactViewport}
          kind={'tertiary'}
          size={'xs'}
        />
      </WrapComingSoonPopover>
      <WrapComingSoonPopover id={'action-follow'} size={'sm'} status={Status.Evaluating}>
        <FollowButton
          clicked={followed}
          count={followCount}
          data-event-id={'action-share-button-click'}
          iconOnly={isCompactViewport}
          kind={'tertiary'}
          size={'xs'}
          onClick={onFollowButtonClick}
        />
      </WrapComingSoonPopover>
      <WrapComingSoonPopover id={'action-save'} size={'sm'} status={Status.Evaluating}>
        <SaveButton
          clicked={saved}
          data-event-id={'action-share-button-click'}
          iconOnly={isCompactViewport}
          kind={'tertiary'}
          size={'xs'}
          onClick={onSaveButtonClick}
        />
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
  const inDraftOrReview = useValue('action.status/check', {
    'action/id': actionId,
    in: [ActionStatus.Draft, ActionStatus.Reviewing],
  });

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
            data-event-id={'action-funding-button-click'}
            disabled={inDraftOrReview}
            kind={'primary'}
            size={'md'}
            value={'Fund'}
            onClick={onFundButtonClick}
          />
        </WrapComingSoonPopover>
        <WrapComingSoonPopover id={'action-volunteering'} status={Status.Planning}>
          <Button
            Icon={Crowd}
            data-event-id={'action-volunteering-button-click'}
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

const ActionContextMenu = suspensify(() => {
  const t = useTranslation();

  const actionId = useValue('current.action/id');
  const canDelete = useValue('action/can-delete', { 'action/id': actionId });
  const openModal = useDispatch('confirmation-modal/open');
  const deleteAction = useDispatch('action/delete');

  const onDeleteClick = useCallback(() => {
    const onConfirm = async () => deleteAction({ 'action/id': actionId });
    openModal({
      kind: 'danger',
      confirmText: t('common/delete'),
      titleText: t('action.delete.modal/title'),
      bodyText: t('action.delete.modal/body'),
      cancelText: t('common/cancel'),
      onConfirm,
    });
  }, [openModal, t, deleteAction, actionId]);

  const items = useMemo(() => {
    let items = [];
    if (canDelete) {
      items.push({
        text: t('common/delete'),
        onClick: onDeleteClick,
        Icon: TrashOutline,
        kind: 'danger',
        key: 'delete',
        type: 'button',
      });
    }

    return items;
  }, [t, canDelete, onDeleteClick]) as ItemType[];
  return items.length === 0 ? null : (
    <ContextMenu dotsOnly={false} items={items} orientation={'vertical'} />
  );
});

export const ActionHeader = suspensify(() => {
  const actionId = useValue('current.action/id');
  const updatedAt = useValue('action/updated-at', { 'action/id': actionId });
  const actionStatus = useValue('action/status', {
    'action/id': actionId,
  });

  const isDraft = actionStatus === ActionStatus.Draft;
  // const isInReview = actionStatus === ActionStatus.Reviewing;

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
                <ActionStatusButton actionId={actionId} />
              </div>
              <div className={'flex gap-4 items-center flex-row-reverse md:flex-row'}>
                {/*{isDraft ? null : <SubscriptionBar suspenseLines={2} />}*/}
                <ActionContextMenu />
              </div>
            </div>
            <Locality actionId={actionId} />
            <div className={'flex flex-col gap-10 w-full'}>
              <div className={'mr-5'}>
                <Title suspenseLineHeight={'36'} suspenseLines={1} />
              </div>
              {isDraft ? null : <ActionBar suspenseLines={2} />}
            </div>
          </div>
          {/*{isDraft || isInReview ? null : <ProgressIndicator suspenseLines={1} />}*/}
        </div>
        <ActionTabs suspenseLines={1} />
      </div>
      <LocalitySlideOver actionId={actionId} />
      <ActionStatusModal />
    </>
  );
});
