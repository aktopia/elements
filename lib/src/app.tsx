import '@elements/index.css';
import { Router } from '@elements/router';
import { useEffect } from 'react';
import { init as initAuth } from '@elements/authentication';

const authConfig = {
  apiDomain: 'http://dev.aktopia.com',
  apiBasePath: '/api/auth',
  appName: 'aktopia',
};

function init() {
  initAuth(authConfig);
}

export const App = () => {
  useEffect(() => {
    init();
  }, []);

  return <Router suspenseLines={20} />;
};
