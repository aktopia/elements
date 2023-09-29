import { suspensify } from '@elements/components/suspensify';
import { dispatch, read, setState, useValue } from '@elements/store';
import { Spinner } from '@elements/components/spinner';
import { type Match } from '@elements/router';
import { NavigationState } from '@elements/logic/router';

export const listener = async (match: Match) => {
  const { id, path, pathParams, queryParams, onNavigateEvent, component, hashParams } = match;
  const loadingState = read('route.navigation/state');
  const currentRouteId = read('current.route/id');
  const navigationUninitiated = loadingState === NavigationState.Uninitiated;
  const navigationInitiated = loadingState === NavigationState.Initiated;
  const newRoute = currentRouteId !== id;

  const shouldNavigate = navigationUninitiated || (navigationInitiated && newRoute);

  if (shouldNavigate) {
    setState((state: any) => {
      state['router/state'] = {
        'route/id': id,
        'route/path-params': pathParams,
        'route/query-params': queryParams,
        'route/hash-params': hashParams,
        'route/component': component,
        'route/path': path,
        'route.navigation/state': NavigationState.Initiated,
      };
    });

    if (onNavigateEvent) {
      await dispatch(onNavigateEvent, { route: match });
      // dispatch 'route.navigation/complete' whenever all the logic is done
    } else {
      dispatch('route.navigation/complete');
    }
  }
};

export const Router = suspensify(() => {
  const routeId = useValue('current.route/id');
  const loadingState = useValue('route.navigation/state');
  const Component = useValue('current.route/component');

  if (loadingState !== NavigationState.Complete) {
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
