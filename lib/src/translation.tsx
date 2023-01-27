import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type TranslationContextType = {
  locale: string;
  locales: any;
  setLocale: Function;
}

const placeholderContext: TranslationContextType = {
  locale: 'en',
  locales: {},
  setLocale: () => {
  },
};

export const TranslationContext = createContext<TranslationContextType>(placeholderContext);

export function useTranslation() {
  const { locale, locales } = useContext(TranslationContext);
  const currentLocale = locales[locale];

  return useCallback((id: string, params?: Record<string, any>) => {
    const fnOrString = currentLocale[id];
    if (typeof fnOrString === 'function') {
      return fnOrString(params);
    }
    return fnOrString;
  }, [currentLocale]);
}

export function useLocale() {
  const { locale, setLocale } = useContext(TranslationContext);
  return { locale, setLocale };
}

interface TranslationProps extends Omit<TranslationContextType, 'setLocale'> {
  children: ReactNode;
}

export function Translation({ locale, locales, children }: TranslationProps) {
  const [selectedLocale, setSelectedLocale] = useState<string>(locale);
  const ctx = useMemo(() => ({
      locale: selectedLocale,
      locales,
      setLocale: setSelectedLocale,
    }), [selectedLocale, locales, setSelectedLocale],
  );

  return (
    <TranslationContext.Provider value={ctx}>{children}</TranslationContext.Provider>
  );
}
