import { Alert } from '@elements/compositions/alert';
import { Router } from '@elements/router';
import { Store, StoreProps } from '@elements/store';
import { locales, Translation, TranslationProps } from '@elements/translation';

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
