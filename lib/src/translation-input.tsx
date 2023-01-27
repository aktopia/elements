import { Button } from '@elements/components/button';
import { useValue } from '@elements/store';
import { getTranslation, TranslationContext } from '@elements/translation';
import React, { useCallback, useContext, useState } from 'react';

function InputTranslation({ id, params, currentLocales, setLocales, currentLocale }: any) {
  const original = getTranslation(currentLocales[currentLocale], id, params);
  const [lo, setLo] = useState(currentLocales);
  const [cl, setCl] = useState(currentLocale);
  const translations = lo[cl];
  const translationValue = getTranslation(translations, id, params);

  const updateLocale = useCallback(
    (s: string) =>
      setLo({
        ...lo,
        [cl]: {
          ...translations,
          [id]: s,
        },
      }),
    [lo, cl, translations, id]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateLocale(e.target.value),
    [updateLocale]
  );

  return (
    <span className={'relative'}>
      <div
        className={
          'absolute top-8 -left-1/2 flex w-max flex-col items-center gap-3 rounded-md border border-gray-300 bg-white p-3 shadow-md'
        }>
        <div className={'grid grid-cols-2 grid-rows-2 gap-x-3'}>
          <div className={'flex items-center text-sm text-gray-500'}>{'Key'}</div>
          <div className={'flex items-center text-sm text-gray-500'}>{'Locale'}</div>
          <div className={'flex items-center text-sm font-medium text-gray-800'}>{id}</div>
          <select
            className={
              'focus:ring-none w-max rounded-md border-gray-300 py-1 pl-2 pr-10 text-sm font-medium text-gray-800 focus:border-none focus:outline-none'
            }
            onChange={(e: any) => {
              console.log(e.target.value);
              setCl(e.target.value);
            }}>
            {Object.keys(currentLocales).map((t) => (
              <option key={t} id={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className={'flex w-full flex-col gap-2'}>
          <div className={'flex items-center text-sm text-gray-500'}>{'Translation'}</div>
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
          <Button
            kind={'tertiary'}
            size={'xs'}
            value={'Reset'}
            onClick={() => updateLocale(original)}
          />
          <Button kind={'primary'} size={'xs'} value={'Done'} onClick={() => setLocales(lo)} />
        </div>
      </div>
      {original}
    </span>
  );
}

export function useInputTranslation() {
  // TODO This should be updated when a feature is built around this to take translations from user
  const { locales } = useContext(TranslationContext);
  const locale = useValue('current/locale');
  const [tempLocales, setTempLocales] = useState(locales);

  console.log(tempLocales);

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
