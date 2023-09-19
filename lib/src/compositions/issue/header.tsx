import { FollowButton } from '@elements/components/follow-button';
import { QRCodeButton } from '@elements/components/qr-code-button';
import { RaiseHand as RawRaiseHand } from '@elements/components/raise-hand';
import { SaveButton } from '@elements/components/save-button';
import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { Timestamp } from '@elements/components/timestamp';
import { SeveritySlider } from '@elements/compositions/issue/severity-slider';
import { Voting as RawVoting } from '@elements/compositions/voting';
import { EntityType } from '@elements/compositions/entity-type';
import { TextEditor } from '@elements/compositions/text-editor';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';
import { EntityType as Type } from '@elements/types';
import { MapPinOutline, MapPinSolid } from '@elements/icons';
import { ChooseLocalitySlideOver as RawChooseLocalitySlideOver } from '@elements/components/choose-locality-slider-over';

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

export const LastActive = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const lastActive = useValue('issue/updated-at', { 'issue/id': issueId });
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

export const IssueTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue('issue.tabs/active-tab');
  const updateTab = useDispatch('issue.tabs/update');
  const tabs = useMemo(
    () => [
      { id: 'home', label: t('common/home') },
      { id: 'media', label: t('common/media') },
      { id: 'locations', label: t('common/locations') },
      { id: 'discuss', label: t('common/discuss') },
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

const Voting = suspensify(() => {
  const issueId = useValue('current.issue/id');

  return (
    <RawVoting refAttribute={'entity.type/issue'} refId={issueId} size={'md'} suspenseLines={2} />
  );
});

const RaiseHand = suspensify(() => {
  const issueId = useValue('current.issue/id');
  const count = useValue('issue.users.facing/count', { 'issue/id': issueId });
  const raised = useValue('issue.current.user/facing', { 'issue/id': issueId });

  const onClick = useDispatch('issue.current.user/face') as () => void;

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

const ChooseLocalityButton = suspensify(() => {
  const t = useTranslation();
  const issueId = useValue('current.issue/id');
  const isLocalityChosen = useValue('issue.locality/exists', { 'issue/id': issueId });
  const localityName = useValue('issue.locality/name', { 'issue/id': issueId });
  const onOpen = useDispatch('issue.locality.slide-over/open') as () => void;

  return isLocalityChosen ? (
    <button
      className={'group flex max-w-5xl items-center justify-center gap-2 overflow-hidden'}
      type={'button'}
      onClick={onOpen}>
      <MapPinSolid className={'h-4 w-4 text-gray-500 group-hover:text-gray-600'} />
      <span
        className={
          'overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 group-hover:text-gray-600 group-hover:underline'
        }>
        {localityName}
      </span>
    </button>
  ) : (
    <button className={'group flex items-center gap-1.5'} type={'button'} onClick={onOpen}>
      <MapPinOutline className={'h-4 w-4 stroke-2 text-gray-500 group-hover:text-gray-600'} />
      <div className={'text-xs text-gray-500 hover:underline group-hover:text-gray-600'}>
        {t('issue.locality/add')}
      </div>
    </button>
  );
});

export const ChooseLocalitySlideOver = suspensify(() => {
  const t = useTranslation();
  const issueId = useValue('current.issue/id');
  const visible = useValue('issue.locality.slide-over/visible');
  const location = useValue('issue.locality/location', { 'issue/id': issueId });
  const zoom = useValue('issue.locality/zoom', { 'issue/id': issueId });
  const onClose = useDispatch('issue.locality.slide-over/close') as () => void;
  const onDone = useDispatch('issue.locality/choose');

  if (!visible) {
    return null;
  }

  const title = location ? t('issue.locality/update') : t('issue.locality/add');

  return (
    <RawChooseLocalitySlideOver
      initialCenter={location}
      initialZoom={zoom}
      title={title}
      visible={visible}
      onClose={onClose}
      onDone={onDone}
    />
  );
});

export const Header = () => {
  return (
    <>
      <div className={'flex flex-col gap-16'}>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex flex-col gap-8'}>
            <div className={'flex items-baseline justify-between'}>
              <div className={'flex items-center gap-7'}>
                <EntityType size={'sm'} type={Type.Issue} />
                <LastActive suspenseLines={1} />
                <ChooseLocalityButton />
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
      <ChooseLocalitySlideOver />
    </>
  );
};
