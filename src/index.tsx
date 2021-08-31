import './i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import * as serviceWorker from './serviceWorker';
import SearchContainer from './modules/search/SearchContainer';
import DataContextProvider from './modules/search/DataContext';

import './index.scss';
import 'hds-core/lib/components/button/button.css';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
