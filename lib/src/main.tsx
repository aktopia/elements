import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@elements/app';
import './index.css';
import { Store } from '@elements/store/impl';
import { locales, Translation } from '@elements/translation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Store>
      <Translation defaultLocale={'en'} locales={locales} suspenseLines={10}>
        <App />
      </Translation>
    </Store>
  </React.StrictMode>
);
