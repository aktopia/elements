import { suspensify } from '@elements/components/suspensify';
import { dispatch, setState, useValue } from '@elements/store';
import { Spinner } from '@elements/components/spinner';
import { type Match } from '@elements/router';

export const listener = async (match: Match) => {
  const { id, path, pathParams, queryParams, onNavigateEvent, component, hashParams } = match;

  setState((state: any) => {
    state['router/state'] = {
      'route/id': id,
      'route/path-params': pathParams,
      'route/query-params': queryParams,
      'route/hash-params': hashParams,
      'route/component': component,
      'route/path': path,
      'route/loading': true,
    };
  });

  await dispatch(onNavigateEvent, { route: match });

  setState((state: any) => {
    state['router/state']['route/loading'] = false;
  });
};

export const Router = suspensify(() => {
  const routeId = useValue('current.route/id');
  const loading = useValue('current.route/loading');
  const Component = useValue('current.route/component');

  if (loading) {
    return (
      <div className={'fixed flex h-full w-full items-center justify-center'}>
        <Spinner kind={'primary'} size={'sm'} visible={true} />
      </div>
    );
  }

  if (!Component) {
    console.error('No route found for route name: ', routeId);
    // TODO - Show Not found page
    return null;
  }

  return <Component suspenseLines={8} />;
});
