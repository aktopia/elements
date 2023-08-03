import { Crowd, Giving, ShareOutline } from '@elements/_icons';
import { Button, ButtonProps } from '@elements/components/button';
import { FollowButton } from '@elements/components/follow-button';
import { ISwitch, NamedSwitch } from '@elements/components/named-switch';
import { ProgressBar } from '@elements/components/progress-bar';
import { QRCodeButton } from '@elements/components/qr-code-button';
import { SaveButton } from '@elements/components/save-button';
import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { Timestamp } from '@elements/components/timestamp';
import { EntityType } from '@elements/compositions/entity-type';
import { TextEditor } from '@elements/compositions/text-editor';
import { Voting } from '@elements/compositions/voting';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';

type ShareButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;
export const ShareButton = ({ clicked, ...props }: ShareButtonProps) => {
  return <Button {...props} Icon={ShareOutline} clicked={clicked} value={'Share'} />;
};

export const SubscriptionBar = suspensify(() => {
  const actionId = useValue<string>('current.action/id');
  const userId = useValue<string>('current.user/id');
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
      <QRCodeButton kind={'tertiary'} size={'xs'} />
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

const Title = suspensify(() => {
  const actionId = useValue<string>('current.action/id');
  const title = useValue<string>('action/title', { 'action/id': actionId });

  return (
    <TextEditor
      className={'text-3xl font-semibold text-gray-800'}
      content={title}
      refAttribute={'action.title/text'}
      refId={actionId}
      suspense={{ lines: 1 }}
    />
  );
});

export const LastActive = suspensify(() => {
  const actionId = useValue('current.action/id');
  const lastActive = useValue<number>('action/last-active-at', { 'action/id': actionId });
  return (
    <Timestamp
      className={'text-xs text-gray-500'}
      // TODO i18n
      prefix={'Active'}
      relative={true}
      timestamp={lastActive}
    />
  );
});

export const ActionBar = suspensify(() => {
  const actionId = useValue<string>('current.action/id');
  const userId = useValue<string>('current.user/id');
  const ident = useMemo(() => ({ 'user/id': userId, 'action/id': actionId }), [userId, actionId]);
  const bumped = useValue<boolean>('action/bumped', ident);
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
    <div className={'flex gap-12'}>
      <Voting
        refAttribute={'entity.type/action'}
        refId={actionId}
        size={'md'}
        suspense={{ lines: 1 }}
      />
      <Button
        Icon={Giving}
        containerClassName={'w-32'}
        kind={'primary'}
        size={'md'}
        value={'Fund'}
        onClick={onFundButtonClick}
      />
      <Button
        Icon={Crowd}
        clicked={bumped}
        kind={'secondary'}
        size={'md'}
        value={'Volunteer'}
        onClick={onBumpButtonClick}
      />
    </div>
  );
});

export const ProgressIndicator = suspensify(() => {
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

export const ActionTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue<string>('action.tabs/active-tab-id');
  const updateTab = useDispatch('action.tabs/update');
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

  const onTabClick = useCallback(
    (tabId: string) => {
      updateTab({ 'tab/id': tabId });
    },
    [updateTab]
  );

  return <Tabs activeTabId={activeTabId} size={'lg'} tabs={tabs} onTabClick={onTabClick} />;
});

export const Header = () => {
  return (
    <div className={'flex flex-col gap-16'}>
      <div className={'flex flex-col gap-10'}>
        <div className={'flex flex-col gap-8'}>
          <div className={'flex items-baseline justify-between'}>
            <div className={'flex gap-7'}>
              <EntityType type={'action'} />
              <LastActive suspense={{ lines: 1 }} />
            </div>
            <SubscriptionBar suspense={{ lines: 2 }} />
          </div>
          <div className={'flex flex-col items-start gap-10'}>
            <div className={'mr-5 h-full w-full'}>
              <Title suspense={{ lines: 1, lineHeight: '36' }} />
            </div>
            <ActionBar suspense={{ lines: 2 }} />
          </div>
        </div>
        <ProgressIndicator suspense={{ lines: 1 }} />
      </div>
      <ActionTabs suspense={{ lines: 1 }} />
    </div>
  );
};
