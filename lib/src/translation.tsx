import { useDispatch, useValue } from '@elements/store';
import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';

type T = (id: string, params?: Record<string, any>) => string;

type TranslationContextType = {
  locale: string;
  locales: any;
  setLocale: Function;
  t: T
}

const placeholderContext: TranslationContextType = {
  locale: 'en',
  locales: {},
  t: () => {
    throw new Error('TranslationContext not initialized');
  },
  setLocale: () => {
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

type TValue = string | ((params?: any) => string)

export function Translation({ fallbackLocale, locales, children }: TranslationProps) {
  const currentLocale = useValue('current/locale');
  const setLocale = useDispatch('current/locale');
  const locale = currentLocale || fallbackLocale;

  const translations = locales[locale];

  const t: T = useCallback((id, params?) => {
    const fnOrString: TValue = translations[id];

    if (!fnOrString) {
      throw new Error(`No translation found for key: ${id}`);
    }

    if (typeof fnOrString === 'function') {
      return fnOrString(params);
    }

    return fnOrString;
  }, [translations]);

  const ctx = useMemo(() => ({
      locale,
      locales,
      setLocale,
      t,
    }), [locale, locales, setLocale, t],
  );

  return (
    <TranslationContext.Provider value={ctx}>{children}</TranslationContext.Provider>
  );
}
