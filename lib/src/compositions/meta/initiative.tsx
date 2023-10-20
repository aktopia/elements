import { suspensify } from '@elements/components/suspensify';
import { Tabs } from '@elements/components/tabs';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { TextEditor } from '@elements/compositions/text-editor';
import { UpVoting } from '@elements/compositions/voting';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { useCallback, useMemo } from 'react';
import { EditButton } from '@elements/components/edit-button';
import { EntityType, EntityType as Type, type LookupRef } from '@elements/types';
import { LastActive } from '@elements/compositions/last-active';
import { updateHashParams } from '@elements/router';
import { wrapPage } from '@elements/compositions/wrap-page';
import { Updates } from '@elements/compositions/updates';
import { Discuss } from '@elements/compositions/discuss';
import { InitiativeStatus } from '@elements/compositions/meta/status';

const Title = suspensify(() => {
  const initiativeSlug = useValue('current.meta.initiative/slug');
  const title = useValue('meta.initiative.title/text', { 'meta.initiative/slug': initiativeSlug });

  const canEdit = useValue('meta.initiative.title/can-edit', {
    'meta.initiative/slug': initiativeSlug,
  });
  const onEdit = useDispatch('meta.initiative.title/edit');

  return (
    <div className={'flex items-start justify-between gap-3'}>
      <TextEditor
        className={'text-3xl font-semibold text-gray-800'}
        content={title}
        output={'text'}
        refAttribute={'meta.initiative.title/text'}
        refId={initiativeSlug}
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
  const initiativeSlug = useValue('current.meta.initiative/slug');
  const lookupRef = useMemo(
    () => ['meta.initiative/slug', initiativeSlug] as LookupRef,
    [initiativeSlug]
  );

  return <UpVoting lookupRef={lookupRef} size={'md'} suspenseLines={1} />;
});

export const InitiativeTabs = suspensify(() => {
  const t = useTranslation();
  const activeTabId = useValue('meta.initiative.tabs/active-tab');
  const tabs = useMemo(
    () => [
      { id: 'discuss', label: t('common/discuss') },
      { id: 'updates', label: t('common/updates') },
    ],
    [t]
  );

  const onTabClick = useCallback((tabId: string) => {
    updateHashParams({ tab: tabId }, { replace: true });
  }, []);

  return <Tabs activeTabId={activeTabId} size={'lg'} tabs={tabs} onTabClick={onTabClick} />;
});

export const Details = suspensify(() => {
  const initiativeSlug = useValue('current.meta.initiative/slug');
  const updatedAt = useValue('meta.initiative/updated-at', {
    'meta.initiative/slug': initiativeSlug,
  });

  return (
    <div className={'flex flex-col gap-16'}>
      <div className={'flex flex-col gap-10'}>
        <div className={'flex flex-col gap-8'}>
          <div className={'flex gap-7'}>
            <EntityTypeBadge size={'sm'} type={Type.MetaInitiative} />
            <LastActive timestamp={updatedAt} />
          </div>
          <div className={'flex flex-col items-start gap-10'}>
            <div className={'mr-5 h-full w-full'}>
              <Title suspenseLineHeight={'36'} suspenseLines={1} />
            </div>
            <ActionBar suspenseLines={2} />
            <InitiativeStatus slug={initiativeSlug} />
          </div>
        </div>
      </div>
      <Description suspenseLines={12} />
      <InitiativeTabs suspenseLines={1} />
    </div>
  );
});

const DescriptionText = suspensify(() => {
  const t = useTranslation();

  const initiativeSlug = useValue('current.meta.initiative/slug');
  const description = useValue('meta.initiative.description/text', {
    'meta.initiative/slug': initiativeSlug,
  });

  const noContent = <p className={'text-gray-400'}>{t('meta.initiative.description/empty')}</p>;

  return (
    <TextEditor
      className={'text-gray-700'}
      content={description}
      noContent={noContent}
      placeholder={t('meta.initiative.description/placeholder')}
      refAttribute={'meta.initiative.description/text'}
      refId={initiativeSlug}
      richText={false}
      suspenseLines={3}
    />
  );
});

const Description = suspensify(() => {
  const t = useTranslation();
  const canEdit = useValue('meta.initiative.description/can-edit');
  const onEdit = useDispatch('meta.initiative.description/edit');

  return (
    <div className={'flex w-full flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-sm font-medium text-gray-500'}>{t('common/description')}</div>
        <EditButton
          canEdit={canEdit}
          className={'h-4 w-4 text-gray-500'}
          suspenseLines={1}
          onEdit={onEdit}
        />
      </div>
      <DescriptionText suspenseLines={6} />
    </div>
  );
});

export const Initiative = wrapPage(() => {
  const activeTabId = useValue('meta.initiative.tabs/active-tab');
  const initiativeSlug = useValue('current.meta.initiative/slug');
  let tab;

  switch (activeTabId) {
    case 'updates':
      tab = (
        <Updates
          refAttribute={EntityType.MetaInitiative}
          refId={initiativeSlug}
          suspenseLines={12}
        />
      );
      break;
    case 'discuss':
      tab = (
        <Discuss
          refAttribute={EntityType.MetaInitiative}
          refId={initiativeSlug}
          suspenseLines={12}
        />
      );
      break;
    default:
      tab = (
        <Discuss
          refAttribute={EntityType.MetaInitiative}
          refId={initiativeSlug}
          suspenseLines={12}
        />
      );
  }

  return (
    <div className={'flex flex-col gap-16'}>
      <Details />
      {tab}
    </div>
  );
});
