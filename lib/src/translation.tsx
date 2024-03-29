import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';
import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';
import type { Translations } from '@elements/translations';

type T = (id: string, params?: Record<string, any>) => string;

type TValue = string | ((params?: any) => string);

type SetLocale = (locale: keyof Translations) => void;

type TranslationContextType = {
  locale: string;
  locales: any;
  setLocale: SetLocale;
  t: T;
};

const placeholderContext: TranslationContextType = {
  locale: 'en',
  locales: {},
  setLocale: (_) => {
    throw new Error('TranslationContext not initialized');
  },
  t: () => {
    throw new Error('TranslationContext not initialized');
  },
};

export const TranslationContext = createContext<TranslationContextType>(placeholderContext);

export interface TranslationProps {
  defaultLocale: string;
  locales: Translations;
  children: ReactNode;
}

export function getTranslation(translations: any, id: string, params?: any) {
  const translationValue: TValue = translations[id];

  if (typeof translationValue === 'function') {
    return translationValue(params);
  }

  return translationValue;
}

export function useTranslation() {
  const { t } = useContext(TranslationContext);
  return t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(TranslationContext);
  return { locale, setLocale };
}

export const Translation = suspensify(({ defaultLocale, locales, children }: TranslationProps) => {
  const currentLocale = useValue('current/locale');
  const setCurrentLocale = useDispatch('current.locale/set');
  const locale = currentLocale || defaultLocale;
  const translations = locales[locale];

  const setLocale = useCallback<SetLocale>(
    (locale) => setCurrentLocale({ locale: locale }),
    [setCurrentLocale]
  );

  const t: T = useCallback(
    (id, params?) => {
      const translation = getTranslation(translations, id, params);

      if (!translation) {
        console.error(`No translation supplied for key: ${id}`);
      }

      return translation;
    },
    [translations]
  );

  const ctx = useMemo(
    () => ({
      locale,
      locales,
      setLocale,
      t,
    }),
    [t, locale, locales, setLocale]
  );

  return <TranslationContext.Provider value={ctx}>{children}</TranslationContext.Provider>;
});

export { default as locales } from '@elements/translations';
