import { suspensify } from '@elements/components/suspensify';
import { TrophyMiniSolid } from '@elements/_icons';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { memo } from 'react';

const Description = suspensify(() => {
  const actionId = useValue('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });
  return <div className={' w-full text-gray-700'}>{description}</div>;
});

const OutcomeText = suspensify(() => {
  const actionId = useValue<string>('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });
  return <div className={'text-blue-700'}>{outcome}</div>;
});

const Outcome = memo(() => {
  const t = useTranslation();

  return (
    <div className={'flex w-full flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('common/outcome')}</div>
      </div>
      <OutcomeText suspenseColor={'primary'} suspenseLines={6} />
    </div>
  );
});

const Relations = suspensify(() => {
  const actionId = useValue('current.action/id');
  const relations = useValue<{ type: string; title: string }[]>('action/relations', {
    'action/id': actionId,
  });
  return (
    <div>
      {relations.map((r) => (
        <>
          <div>{r.type}</div>
          <div>{r.title}</div>
        </>
      ))}
    </div>
  );
});

export const HomeSection = () => {
  return (
    <div className={'flex w-full gap-8'}>
      <div className={'flex w-full flex-col gap-5'}>
        <Description suspenseLines={6} />
        <Outcome />
      </div>
      <Relations suspenseLines={8} />
    </div>
  );
};
