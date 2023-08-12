import { Spinner } from '@elements/components/spinner';
import { suspensify } from '@elements/components/suspensify';
import { Alert } from '@elements/compositions/alert';
import '@elements/index.css';
import { Router } from '@elements/router';
import { useValue } from '@elements/store';

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

export const App = ({}) => {
  return <Main suspense={{ lines: 10 }} />;
};
