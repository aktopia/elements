import { evt, sub } from '@elements/store';
import type { Translations } from '@elements/translations';
import type { Evt, Sub } from '@elements/store/types';

export type Subs = {
  'current/locale': Sub<{}, keyof Translations>;
};

export type Events = {
  'current.locale/set': Evt<{ locale: string }>;
};

export const localeSlice = () => ({
  'locale/state': { 'current/locale': 'en' },
});

sub('current/locale', ({ state }) => state['locale/state']['current/locale']);

evt('current.locale/set', ({ setState, params }) => {
  setState((state: any) => {
    state['locale/state']['current/locale'] = params.locale;
  });
});
