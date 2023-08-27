import { evt, sub } from '@elements/store';

export type Subs = {
  'current/locale': {
    params: {};
    result: string;
  };
};

export type Events = {
  'current.locale/set': {
    params: {
      locale: string;
    };
  };
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
