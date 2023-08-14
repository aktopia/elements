import '@elements/index.css';
import { Router } from '@elements/router';

export const App = () => {
  return <Router suspenseLines={20} />;
};
