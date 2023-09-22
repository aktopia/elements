import '@elements/index.css';
import { Router, listener } from '@elements/compositions/router';
import { useEffect } from 'react';
import { init as initAuth } from '@elements/authentication';
import { dispatch, useValue } from '@elements/store';
import { suspensify } from '@elements/components/suspensify';
import { Spinner } from '@elements/components/spinner';
import { initRouter } from '@elements/router';
import { routes } from '@elements/routes';

const authConfig = {
  // TODO - Move to env
  apiDomain: 'http://dev.aktopia.com',
  apiBasePath: '/api/auth',
  appName: 'aktopia',
};

function init() {
  initAuth(authConfig);
  initRouter(routes, listener);
  dispatch('app/load');
}

export const App = suspensify(() => {
  useEffect(() => {
    init();
  }, []);

  const loading = useValue('app/loading');

  return loading ? (
    <div className={'fixed flex h-full w-full items-center justify-center'}>
      <Spinner kind={'primary'} size={'sm'} visible={true} />
    </div>
  ) : (
    <Router suspenseLines={20} />
  );
});
