import { wrapPage } from '@elements/compositions/wrap-page';
import { ExclamationCircleOutline } from '@elements/icons';
import { useTranslation } from '@elements/translation';

export const NotFound = wrapPage(() => {
  const t = useTranslation();

  return (
    <div className={'items-center justify-center w-full flex flex-col gap-5'}>
      <div className={'flex flex-col items-center justify-center gap-3'}>
        <ExclamationCircleOutline className={'h-14 w-14 text-gray-400'} />
        <h1 className={'text-gray-500 text-xl font-medium'}>{t('error/not-found')}</h1>
      </div>
      <h2 className={'text-gray-500 text-base'}>{t('error.not-found/message')}</h2>
    </div>
  );
});
