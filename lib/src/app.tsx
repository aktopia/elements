import { Spinner } from '@elements/components/spinner';
import { suspensify } from '@elements/components/suspensify';
import { Alert } from '@elements/compositions/alert';
import '@elements/index.css';
import { Router } from '@elements/router';
import { Store, StoreProps, useValue } from '@elements/store';
import { locales, Translation, TranslationProps } from '@elements/translation';

interface AppProps extends StoreProps, TranslationProps {}

const Main = suspensify(() => {
  const loading = useValue<boolean>('app/loading');

  return loading ? (
    <Spinner visible={loading} />
  ) : (
    <>
      <Router suspense={{ lines: 20 }} />
      <Alert suspense={{ lines: 5 }} />
    </>
  );
});

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
      <Translation defaultLocale={defaultLocale} locales={locales} suspense={{ lines: 10 }}>
        <Main suspense={{ lines: 10 }} />
      </Translation>
    </Store>
  );
};
