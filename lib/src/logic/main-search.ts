import { evt, remoteSub, sub } from '@elements/store';
import type { EntityType } from '@elements/types';
import { rpcGet } from '@elements/rpc';

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

const emptyResults: SearchResult[] = [];

export const mainSearchSlice = () => ({
  'main-search/state': {
    'main-search/visible': false,
    'main-search/query': '',
    'main-search/results': emptyResults,
  },
});

sub('main-search/visible', ({ state }) => state['main-search/state']['main-search/visible']);
sub('main-search/query', ({ state }) => state['main-search/state']['main-search/query']);

remoteSub('main-search/results');
// sub('main-search/results', () => results);

evt('main-search/open', ({ setState }) => {
  setState((state: any) => {
    state['main-search/state']['main-search/visible'] = true;
  });
});

evt('main-search.query/set', async ({ setState, params }) => {
  setState((state: any) => {
    state['main-search/state']['main-search/query'] = params.value;
  });

  const results = await rpcGet('main-search/results', { query: params.value });

  setState((state: any) => {
    state['main-search/state']['main-search/results'] = results;
  });
});

evt('main-search/close', ({ setState }) => {
  console.trace('main-search/close');

  setState((state: any) => {
    state['main-search/state']['main-search/visible'] = false;
    state['main-search/state']['main-search/query'] = '';
  });
});
