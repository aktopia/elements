import '@elements/index.css';
import { Router } from '@elements/compositions/router';
import { useEffect } from 'react';
import { init as initAuth } from '@elements/authentication';
import { dispatch, useValue } from '@elements/store';
import { suspensify } from '@elements/components/suspensify';
import { authApiDomain } from '@elements/config';
import { FullPageSpinner } from '@elements/components/full-page-spinner';
import { initRouter } from '@elements/router';

const authConfig = {
  apiDomain: authApiDomain,
  apiBasePath: '/api/auth',
  appName: 'aktopia',
};

const handleViewportResize = () => {
  dispatch('viewport/resize');
};

function init() {
  initAuth(authConfig);
  initRouter();
  dispatch('app/load');
  handleViewportResize();
}

const handleClick = (event: any) => {
  // FIXME This might be expensive, evaluate how expensive
  // DO NOT DO SOMETHING SIMILAR FOR EVENTS LIKE SCROLL
  const element = event.target.closest('[data-event-id]');
  if (element) {
    const eventId = element.getAttribute('data-event-id')?.toLowerCase();
    const eventCategory = element.getAttribute('data-event-category')?.toLowerCase();
    gtag('event', eventId, { event_category: eventCategory });
  }
};

export const App = suspensify(() => {
  useEffect(() => {
    init();
    window.addEventListener('resize', handleViewportResize);

    return () => {
      window.removeEventListener('resize', handleViewportResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const loading = useValue('app/loading');

  return loading ? FullPageSpinner : <Router suspenseFallback={FullPageSpinner} />;
});
