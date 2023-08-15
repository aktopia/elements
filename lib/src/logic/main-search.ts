import { evt, sub } from '@elements/store/register';

export const mainSearchSlice = () => ({
  mainSearchState: {
    visible: false,
    query: '',
  },
});

sub('main-search/visible', ({ state }) => state.mainSearchState.visible);
sub('main-search/query', ({ state }) => state.mainSearchState.query);
sub('main-search/results', ({ state }) => []);

evt('main-search/open', ({ setState }) => {
  setState((state: any) => {
    state.mainSearchState.visible = true;
  });
});

evt('main-search.query/set', ({ setState, params }) => {
  setState((state: any) => {
    state.mainSearchState.query = params.value;
  });
});

evt('main-search/close', ({ setState }) => {
  setState((state: any) => {
    state.mainSearchState.visible = false;
    state.mainSearchState.query = '';
  });
});
