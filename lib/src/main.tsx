import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@elements/app';
import './index.css';
import { Store } from '@elements/store/impl';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
);
