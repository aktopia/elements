import { suspensify } from '@elements/components/suspensify';
import { dispatch, useValue } from '@elements/store';
import { Spinner } from '@elements/components/spinner';
import { type Match } from '@elements/router';
import { NavigationState } from '@elements/logic/router';
import { NotFound } from '@elements/compositions/not-found';

export const listener = (match: Match) => dispatch('route.navigation/initiate', match);

const fullPageSpinner = (
  <div className={'fixed flex h-full w-full items-center justify-center'}>
    <Spinner kind={'primary'} size={'sm'} visible={true} />
  </div>
);
export const Router = suspensify(() => {
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
    return <NotFound />;
  }

  return <Component suspenseFallback={fullPageSpinner} />;
});
