import { suspensify } from '@elements/components/suspensify';
import { queryFunction, useValue } from '@elements/store-impl';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFunction,
      suspense: true,
    },
  },
});

const App = suspensify(() => {
  const k = useValue<number>('action/id', { id: 8 });
  return <div>{k}</div>;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App suspense={{ lines: 1 }} />
    </QueryClientProvider>
  </React.StrictMode>
);
