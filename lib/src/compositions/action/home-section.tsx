import { TrophyMiniSolid } from '@elements/_icons';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';

function Description() {
  const actionId = useValue('current.action/id');
  const description = useValue<string>('action/description', { 'action/id': actionId });
  return <div className={'text-gray-700'}>{description}</div>;
}

function Outcome() {
  const t = useTranslation();
  const actionId = useValue('current.action/id');
  const outcome = useValue<string>('action/outcome', { 'action/id': actionId });

  return (
    <div className={'flex flex-col gap-2 rounded-md border border-blue-600 bg-blue-50 p-6'}>
      <div className={'flex items-center gap-3'}>
        <TrophyMiniSolid className={'h-4 w-5 text-blue-700'} />
        <div className={'font-medium text-blue-700'}>{t('common/outcome', { a: 'what' })}</div>
      </div>
      <div className={'text-blue-700'}>{outcome}</div>
    </div>
  );
}

function Relations() {
  const actionId = useValue('current.action/id');
  const relations = useValue('action/relations', { 'action/id': actionId });
  console.log(relations);
  return <div />;
}

export function HomeSection() {
  return (
    <div className={'flex gap-8'}>
      <div className={'flex flex-col gap-5'}>
        <Description />
        <Outcome />
      </div>
      <Relations />
    </div>
  );
}
