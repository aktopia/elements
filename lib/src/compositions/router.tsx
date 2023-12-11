import { suspensify } from '@elements/components/suspensify';
import { useValue } from '@elements/store';
import { Spinner } from '@elements/components/spinner';
import { NavigationState } from '@elements/logic/router';
import { NotFoundPage } from '@elements/compositions/not-found';
import { resolveComponent } from '@elements/routes';
import { FullPageSpinner } from '@elements/components/full-page-spinner';

export const Router = suspensify(() => {
  const currentRoute = useValue('current.route/id');
  const loadingState = useValue('route.navigation/state');
  const Component = resolveComponent[currentRoute];

  if (loadingState !== NavigationState.Complete) {
    return (
      <div className={'fixed flex h-full w-full items-center justify-center'}>
        <Spinner kind={'primary'} size={'sm'} visible={true} />
      </div>
    );
  }

  if (!Component) {
    return <NotFoundPage />;
  }

  return <Component suspenseFallback={FullPageSpinner} />;
});
