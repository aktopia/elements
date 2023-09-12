import { evt, remoteSub, sub } from '@elements/store';
import type { EntityType } from '@elements/types';

export interface SearchResult {
  'entity/type': EntityType;
  'match/snippet': string;
  'match/text': string;
  'match/id': string;
  'match/score': string;
  'entity/id': string;
}

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
    params: { query: string };
    result: SearchResult[];
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

sub('main-search/visible', ({ state }) => state['main-search/state']['main-search/visible']);
sub('main-search/query', ({ state }) => state['main-search/state']['main-search/query']);

remoteSub('main-search/results');

evt('main-search/open', ({ setState }) => {
  setState((state: any) => {
    state['main-search/state']['main-search/visible'] = true;
  });
});

evt('main-search.query/set', async ({ setState, params }) => {
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
