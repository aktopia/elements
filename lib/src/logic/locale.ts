import { evt, sub } from '@elements/store';

export const localeSlice = () => ({ 'locale/state': { 'current/locale': 'en' } });

sub('current/locale', (state) => state['locale/state']['current/locale']);

evt('current.locale/set', (setState, { locale }: any) =>
  setState({ 'locale/state': { 'current/locale': locale } })
);
