import { suspensify } from '@elements/components/suspensify';
import { routeData, routes } from '@elements/routes';
import { useValue } from '@elements/store';
import { initRouter } from '@elements/logic/router';
import { Spinner } from '@elements/components/spinner';

// TODO Redesign router
initRouter({ routes });

export const Router = suspensify(() => {
  const routeId = useValue('current.route/id');
  const loading = useValue('current.route/loading');

  const Component = routeData[routeId].component;

  if (!Component) {
    console.error('No route found for route name: ', routeId);
    // TODO - Show Not found page
    return null;
  }

  return loading ? (
    <div className={'fixed flex h-full w-full items-center justify-center'}>
      <Spinner kind={'primary'} size={'sm'} visible={true} />
    </div>
  ) : (
    <Component suspenseLines={8} />
  );
});
