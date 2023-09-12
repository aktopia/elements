import { asyncSub, evt, sub } from '@elements/store';
import { fetchPredictions } from '@elements/utils/location';

export type Subs = {
  'choose-locality.search.input/query': {
    params: {};
    result: string;
  };
  'choose-locality.search/results': {
    params: { query: string };
    result: any[];
  };
  'choose-locality.slide-over/visible': {
    params: {};
    result: boolean;
  };
};

export type Events = {
  'choose-locality.slide-over/close': {
    params: {};
  };
  'choose-locality.slide-over/open': {
    params: {};
  };
  'choose-locality.search.input.query/update': {
    params: { value: string };
  };
};

export const localitySlice = () => ({
  'locality/state': {
    'choose-locality.slide-over/visible': false,
    'choose-locality.search.input/query': '',
  },
});

sub('choose-locality.search.input/query', ({ state }: any) => {
  return state['locality/state']['choose-locality.search.input/query'];
});

sub(
  'choose-locality.slide-over/visible',
  ({ state }: any) => state['locality/state']['choose-locality.slide-over/visible']
);

asyncSub('choose-locality.search/results', async ({ params }) => {
  const query = params.query;
  return await fetchPredictions(query);
});

// const r = [];
// sub('choose-locality.search/results', ({ state }: any) => {
//   return r;
// });

evt('choose-locality.slide-over/close', ({ setState }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = false;
    state['locality/state']['choose-locality.search.input/query'] = '';
  });
});

evt('choose-locality.slide-over/open', ({ setState }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.slide-over/visible'] = true;
  });
});

evt('choose-locality.search.input.query/update', ({ setState, params }) => {
  setState((state: any) => {
    state['locality/state']['choose-locality.search.input/query'] = params.value;
  });
});
