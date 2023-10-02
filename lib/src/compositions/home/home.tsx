import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { EntityType } from '@elements/types';
import { ActionCard } from '@elements/compositions/home/action-card';
import { IssueCard } from '@elements/compositions/home/issue-card';
import { useCallback, useMemo, useRef, useState } from 'react';
import { suspensify } from '@elements/components/suspensify';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { Map } from '@elements/components/map';
import { useTranslation } from '@elements/translation';
import type { Subs } from '@elements/store/types';

const LocalitySlideOver = suspensify(({ entityId, entityType, onClose }: any) => {
  const t = useTranslation();
  const [locationKey, zoomKey, idKey, tKey] =
    entityType === EntityType.Issue
      ? ['issue.locality/location', 'issue.locality/zoom', 'issue/id', 'issue/locality']
      : ['action.locality/location', 'action.locality/zoom', 'action/id', 'action/locality'];

  const location = useValue(locationKey as keyof Subs, { [idKey]: entityId });
  const zoom = useValue(zoomKey as keyof Subs, { [idKey]: entityId });
  const locations = useMemo(() => [location], [location]);

  const mapRef = useRef(null);

  return (
    <SlideOver visible={true} onClose={onClose}>
      <div className={'relative flex h-full flex-col justify-between'}>
        <div>
          <SlideOverHeader>
            <SlideOverTitle title={t(tKey)} />
            <SlideOverCloseButton onClick={onClose} />
          </SlideOverHeader>
          <SlideOverBody>
            <div className={'flex h-fit items-center gap-5'}>
              <div className={'relative h-[25rem] w-[400px] overflow-hidden rounded-lg shadow'}>
                <Map
                  ref={mapRef}
                  initialCenter={location}
                  initialZoom={zoom}
                  locations={locations}
                />
              </div>
            </div>
          </SlideOverBody>
        </div>
      </div>
    </SlideOver>
  );
});

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

  return (
    <>
      <div className={'flex flex-col gap-9'}>
        {list.map((e) => {
          let Component;
          switch (e['entity/type']) {
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
            <Component
              key={e['entity/id']}
              id={e['entity/id']}
              onLocalitySlideOverOpen={onLocalitySlideOverOpen}
            />
          );
        })}
      </div>
      {localitySlideOverArgs.visible ? (
        <LocalitySlideOver
          entityId={localitySlideOverArgs.entityId}
          entityType={localitySlideOverArgs.entityType}
          visible={true}
          onClose={onLocalitySlideOverClose}
        />
      ) : null}
    </>
  );
});

/*
TODO
 - Make infinite scroll

 */
