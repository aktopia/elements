import { evt, sub } from '@elements/store';

export type Subs = {
  'main-search/visible': {
    params: {};
    result: boolean;
  };
  'main-search/query': {
    params: {};
    result: string;
  };
  'main-search/results': {
    params: {};
    result: any[];
  };
};

export type Events = {
  'main-search/open': {
    params: {};
  };
  'main-search.query/set': {
    params: {
      value: string;
    };
  };
  'main-search/close': {
    params: {};
  };
};

export const mainSearchSlice = () => ({
  'main-search/state': {
    'main-search/visible': false,
    'main-search/query': '',
  },
});

const results: any[] = [];

sub('main-search/visible', ({ state }) => state['main-search/state']['main-search/visible']);
sub('main-search/query', ({ state }) => state['main-search/state']['main-search/query']);
sub('main-search/results', () => results);

evt('main-search/open', ({ setState }) => {
  setState((state: any) => {
    state['main-search/state']['main-search/visible'] = true;
  });
});

evt('main-search.query/set', ({ setState, params }) => {
  setState((state: any) => {
    state['main-search/state']['main-search/query'] = params.value;
  });
});

evt('main-search/close', ({ setState }) => {
  setState((state: any) => {
    state['main-search/state']['main-search/visible'] = false;
    state['main-search/state']['main-search/query'] = '';
  });
});
