import { Alert } from '@elements/compositions/alert';
import '@elements/index.css';
import { Router } from '@elements/router';
import { Store, StoreProps } from '@elements/store';
import { locales, Translation, TranslationProps } from '@elements/translation';
import 'react-loading-skeleton/dist/skeleton.css';

interface AppProps extends StoreProps, TranslationProps {}

export const App = ({
  subscribe,
  read,
  dispatch,
  checkPending,
  equal,
  marshal,
  defaultLocale,
}: AppProps) => {
  return (
    <Store
      checkPending={checkPending}
      dispatch={dispatch}
      equal={equal}
      marshal={marshal}
      read={read}
      subscribe={subscribe}>
      <Translation defaultLocale={defaultLocale} locales={locales}>
        <Router />
        <Alert />
      </Translation>
    </Store>
  );
};
