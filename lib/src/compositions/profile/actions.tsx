import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';
import { ActionCard } from '@elements/compositions/action/action-card';
import { ViewLocalitySlideOver as RawViewLocalitySlideOver } from '@elements/components/view-locality-slide-over';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from '@elements/translation';

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

export const Actions = suspensify(() => {
  const t = useTranslation();
  const userId = useValue('profile.user/id');
  const actionIds = useValue('profile.action/ids', { 'user/id': userId });
  const [localitySlideOverId, setLocalitySlideOverId] = useState<string | null>(null);

  const slideOverVisible = localitySlideOverId !== null;

  const onLocalitySlideOverOpen = useCallback((entityId: string) => {
    setLocalitySlideOverId(entityId);
  }, []);

  const onLocalitySlideOverClose = useCallback(() => {
    setLocalitySlideOverId(null);
  }, []);

  return (
    <>
      {actionIds.length === 0 ? (
        <div className={'text-base text-gray-500'}>{t('profile.actions/empty')}</div>
      ) : (
        <div className={'flex flex-col gap-9'}>
          {actionIds.map((id) => (
            <ActionCard
              key={id}
              id={id}
              suspenseLines={2}
              onLocalitySlideOverOpen={onLocalitySlideOverOpen}
            />
          ))}
        </div>
      )}
      {slideOverVisible ? (
        <ViewActionLocalitySlideOver
          entityId={localitySlideOverId}
          onClose={onLocalitySlideOverClose}
        />
      ) : null}
    </>
  );
});
