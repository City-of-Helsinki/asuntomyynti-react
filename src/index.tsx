import './i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import 'hds-core/lib/components/button/button.css';
import * as serviceWorker from './serviceWorker';
import SearchContainer from './modules/search/SearchContainer';
import FilterContextProvider from './modules/search/FilterContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FilterContextProvider>
        <SearchContainer />
      </FilterContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('asu_react_search')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
