import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { EntityType } from '@elements/types';
import { ActionCard } from '@elements/compositions/action/action-card';
import { IssueCard } from '@elements/compositions/issue/issue-card';
import { useCallback, useMemo, useState } from 'react';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { ViewLocalitySlideOver as RawViewLocalitySlideOver } from '@elements/components/view-locality-slide-over';

const ViewIssueLocalitySlideOver = suspensify(({ entityId, onClose }: any) => {
  const t = useTranslation();
  const initialCenter = useValue('issue.locality/location', { 'issue/id': entityId });
  const initialZoom = useValue('issue.locality/zoom', { 'issue/id': entityId });
  const locations = useMemo(() => [initialCenter], [initialCenter]);

  return (
    <RawViewLocalitySlideOver
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      locations={locations}
      title={t('issue/locality')}
      visible={true}
      onClose={onClose}
    />
  );
});

const ViewActionLocalitySlideOver = suspensify(({ entityId, onClose }: any) => {
  const t = useTranslation();
  const initialCenter = useValue('action.locality/location', { 'action/id': entityId });
  const initialZoom = useValue('action.locality/zoom', { 'action/id': entityId });
  const locations = useMemo(() => [initialCenter], [initialCenter]);

  return (
    <RawViewLocalitySlideOver
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      locations={locations}
      title={t('action/locality')}
      visible={true}
      onClose={onClose}
    />
  );
});

const Card = ({ entityId, entityType, onLocalitySlideOverOpen }: any) => {
  const onLocalitySlideOverOpen_ = useCallback(
    (entityId: string) => {
      onLocalitySlideOverOpen(entityId, entityType);
    },
    [entityType, onLocalitySlideOverOpen]
  );

  let Component;
  switch (entityType) {
    case EntityType.Action:
      Component = ActionCard;
      break;
    case EntityType.Issue:
      Component = IssueCard;
      break;
    default:
      Component = () => null;
  }

  return (
    <Component key={entityId} id={entityId} onLocalitySlideOverOpen={onLocalitySlideOverOpen_} />
  );
};

export const Home = wrapPage(() => {
  const userLocation = useValue('user.locality/location');
  const list = useValue('home-feed/list', { 'user.locality/location': userLocation });
  const [localitySlideOverArgs, setLocalitySlideOverArgs] = useState<{
    entityId?: string;
    entityType?: EntityType;
    visible: boolean;
  }>({
    visible: false,
  });

  const onLocalitySlideOverOpen = useCallback((entityId: string, entityType: EntityType) => {
    setLocalitySlideOverArgs({ entityId, entityType, visible: true });
  }, []);

  const onLocalitySlideOverClose = useCallback(() => {
    setLocalitySlideOverArgs({ visible: false });
  }, []);

  const viewLocalitySlideOverUI = useMemo(() => {
    if (!localitySlideOverArgs.visible) {
      return null;
    }

    let Component;
    switch (localitySlideOverArgs.entityType) {
      case EntityType.Action:
        Component = ViewActionLocalitySlideOver;
        break;
      case EntityType.Issue:
        Component = ViewIssueLocalitySlideOver;
        break;
      default:
        Component = () => null;
    }

    return (
      <Component entityId={localitySlideOverArgs.entityId} onClose={onLocalitySlideOverClose} />
    );
  }, [
    localitySlideOverArgs.entityId,
    localitySlideOverArgs.entityType,
    onLocalitySlideOverClose,
    localitySlideOverArgs.visible,
  ]);

  return (
    <>
      <div className={'flex flex-col gap-9'}>
        {list.map((e) => (
          <Card
            key={e['entity/id']}
            entityId={e['entity/id']}
            entityType={e['entity/type']}
            onLocalitySlideOverOpen={onLocalitySlideOverOpen}
          />
        ))}
      </div>
      {viewLocalitySlideOverUI}
    </>
  );
});

/*
TODO
 - Make infinite scroll

 */
