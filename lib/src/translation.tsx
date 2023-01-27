import { Button } from '@elements/components/button';
import { useDispatch, useValue } from '@elements/store';
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type T = (id: string, params?: Record<string, any>) => string;

type TValue = string | ((params?: any) => string);

type SetLocale = (locale: string) => void;

type TranslationContextType = {
  locale: string;
  locales: any;
  setLocale: SetLocale;
  t: T;
};

const placeholderContext: TranslationContextType = {
  locale: 'en',
  locales: {},
  t: () => {
    throw new Error('TranslationContext not initialized');
  },
  setLocale: (_) => {
    throw new Error('TranslationContext not initialized');
  },
};

export const TranslationContext = createContext<TranslationContextType>(placeholderContext);

export function useTranslation() {
  const { t } = useContext(TranslationContext);
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(TranslationContext);
  return { locale, setLocale };
}

interface TranslationProps {
  fallbackLocale: string;
  locales: any;
  children: ReactNode;
}

function getTranslationValue(translations: any, id: string, params?: any) {
  const fnOrString: TValue = translations[id];

  if (typeof fnOrString === 'function') {
    return fnOrString(params);
  }

  return fnOrString;
}

function InputTranslation({ id, params, currentLocales, setLocales, currentLocale }: any) {
  const original = getTranslationValue(currentLocales[currentLocale], id, params);
  const [lo, setLo] = useState(currentLocales);
  const [cl, setCl] = useState(currentLocale);
  const translations = lo[cl];
  const translationValue = getTranslationValue(translations, id, params);

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

export function Translation({ fallbackLocale, locales, children }: TranslationProps) {
  const currentLocale = useValue('current/locale');
  const setCurrentLocale = useDispatch('current/locale');
  const locale = currentLocale || fallbackLocale;
  const translations = locales[locale];
  const [lo, setLo] = useState(locales);
  const isTakingInput = true;

  console.log(lo);

  const setLocale = useCallback<SetLocale>(
    (locale) => setCurrentLocale({ locale: locale }),
    [setCurrentLocale]
  );

  const t: T = useCallback(
    (id, params?) => {
      const translation = getTranslationValue(translations, id, params);

      if (!translation) {
        console.error(`No translation found for key: ${id}`);
      }

      return translation;
    },
    [translations]
  );

  const k = (id: string, params?: any) => {
    return (
      <InputTranslation
        currentLocale={locale}
        currentLocales={locales}
        id={id}
        params={params}
        setLocales={setLo}
      />
    );
  };

  const z = isTakingInput ? k : t;

  const ctx = useMemo(
    () => ({
      locale,
      locales,
      setLocale,
      t: z,
    }),
    [z, locale, locales, setLocale]
  );

  return <TranslationContext.Provider value={ctx}>{children}</TranslationContext.Provider>;
}
