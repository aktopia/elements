import { Button } from '@elements/components/button';
import { useValue } from '@elements/store/interface';
import { getTranslation, TranslationContext } from '@elements/translation';
import React, { useCallback, useContext, useState } from 'react';

const InputTranslation = ({ id, params, currentLocales, setLocales, currentLocale }: any) => {
  const originalTranslation = getTranslation(currentLocales[currentLocale], id, params);
  const [workingLocales, setWorkingLocales] = useState(currentLocales);
  const [workingLocale, setWorkingLocale] = useState(currentLocale);
  const translations = workingLocales[workingLocale];
  const translationValue = getTranslation(translations, id, params);

  const updateLocale = useCallback(
    (translation: string) =>
      setWorkingLocales({
        ...workingLocales,
        [workingLocale]: {
          ...translations,
          [id]: translation,
        },
      }),
    [workingLocales, workingLocale, translations, id]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateLocale(e.target.value),
    [updateLocale]
  );

  const onWorkingLocaleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkingLocale(e.target.value);
  }, []);

  const onReset = useCallback(
    () => updateLocale(originalTranslation),
    [originalTranslation, updateLocale]
  );

  const onDone = useCallback(() => setLocales(workingLocales), [workingLocales, setLocales]);

  const [keyLabel, localeLabel, translationLabel] = ['Key', 'Locale', 'Translation'];

  return (
    <span className={'relative'}>
      <div
        className={
          'absolute top-8 -left-1/2 flex w-max flex-col items-center gap-3 rounded-md border border-gray-300 bg-white p-3 shadow-md'
        }>
        <div className={'grid grid-cols-2 grid-rows-2 gap-x-3'}>
          <div className={'flex items-center text-sm text-gray-500'}>{keyLabel}</div>
          <div className={'flex items-center text-sm text-gray-500'}>{localeLabel}</div>
          <div className={'flex items-center text-sm font-medium text-gray-800'}>{id}</div>
          <select
            className={
              'w-max rounded-md border-gray-300 py-1 pl-2 pr-10 text-sm font-medium text-gray-800 focus:border-none focus:outline-none'
            }
            onChange={onWorkingLocaleChange}>
            {Object.keys(currentLocales).map((t) => (
              <option key={t} id={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className={'flex w-full flex-col gap-2'}>
          <div className={'flex items-center text-sm text-gray-500'}>{translationLabel}</div>
          <input
            className={
              'h-max w-full rounded border border-gray-300 bg-gray-50 py-1 px-1.5 text-sm font-medium text-gray-600 shadow-inner'
            }
            id={id}
            value={translationValue}
            onChange={onChange}
          />
        </div>
        <div className={'flex gap-3'}>
          <Button kind={'tertiary'} size={'xs'} value={'Reset'} onClick={onReset} />
          <Button kind={'primary'} size={'xs'} value={'Done'} onClick={onDone} />
        </div>
      </div>
      {originalTranslation}
    </span>
  );
};

export function useInputTranslation() {
  /* TODO This can be updated and use when a feature is built around this to take
          translations from user, currently just a prototype to see if it works
          and the idea does work
      */
  const { locales } = useContext(TranslationContext);
  const locale = useValue('current/locale');
  // @ts-ignore
  const [tempLocales, setTempLocales] = useState(locales);

  return useCallback(
    (id: string, params?: any) => {
      return (
        <InputTranslation
          currentLocale={locale}
          currentLocales={locales}
          id={id}
          params={params}
          setLocales={setTempLocales}
        />
      );
    },
    [locale, locales]
  );
}
