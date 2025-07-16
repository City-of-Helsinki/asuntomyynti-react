import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';

import DataContextProvider from './modules/search/DataContext';
import SearchContainer from './modules/search/SearchContainer';

import 'hds-core/lib/components/button/button.css';
import './index.scss';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.25,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataContextProvider>
        <SearchContainer />
      </DataContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('asu_react_search')
);
