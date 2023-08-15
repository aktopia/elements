import { evt, sub } from '@elements/store';

export const localeSlice = () => ({ localeState: { locale: 'en' } });

sub('current/locale', ({ state }) => state.localeState.locale);

evt('current.locale/set', ({ setState, params }) => {
  setState((state: any) => {
    state.localeState.locale = params.locale;
  });
});
