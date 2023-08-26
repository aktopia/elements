import '@elements/index.css';
import { Router } from '@elements/router';
import { useEffect } from 'react';
import { init as initAuth } from '@elements/authentication';
import { dispatch, useValue } from '@elements/store';
import { suspensify } from '@elements/components/suspensify';
import { Spinner } from '@elements/components/spinner';

const authConfig = {
  apiDomain: 'http://dev.aktopia.com',
  apiBasePath: '/api/auth',
  appName: 'aktopia',
};

initAuth(authConfig);

function init() {
  dispatch('app/load');
}

export const App = suspensify(() => {
  const loading = useValue('app/loading');
  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <div className={'fixed flex h-full w-full items-center justify-center'}>
      <Spinner kind={'primary'} size={'sm'} visible={true} />
    </div>
  ) : (
    <Router suspenseLines={20} />
  );
});
