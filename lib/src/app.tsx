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
  const loading = useValue<boolean>('app/loading');
  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <Spinner kind={'primary'} size={'sm'} visible={true} />
  ) : (
    <Router suspenseLines={20} />
  );
});
