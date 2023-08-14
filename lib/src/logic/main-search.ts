import { evt, sub } from '@elements/store/register';

export const mainSearchSlice = () => ({
  'main-search/state': {
    'main-search/visible': false,
    'main-search/query': '',
  },
});

sub('main-search/visible', (state) => state['main-search/state']['main-search/visible']);
sub('main-search/query', (state) => state['main-search/state']['main-search/query']);
sub('main-search/results', (_state) => []);

evt('main-search/open', (_setState, _params) => null);

evt('main-search.query/set', (_setState, _params) => null);

evt('main-search/close', (_setState, _params) => null);
