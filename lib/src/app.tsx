import '@elements/index.css';
import { Router } from '@elements/router';

export const App = () => {
  return <Router suspense={{ lines: 20 }} />;
};
