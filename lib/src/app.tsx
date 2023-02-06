import { Router } from '@elements/router';
import { Store } from '@elements/store';
import { locales, Translation } from '@elements/translation';

export const App = ({
  subscribe,
  read,
  dispatch,
  checkPending,
  equal,
  marshal,
  defaultLocale,
}: any) => {
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
      </Translation>
    </Store>
  );
};

export default App;
