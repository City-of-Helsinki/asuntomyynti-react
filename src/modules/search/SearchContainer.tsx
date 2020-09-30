import React from 'react';
import SearchResults from './SearchResults';
import css from './SearchContainer.module.scss';
import SearchForm from '../../components/SearchForm';
import { BrowserRouter as Router } from 'react-router-dom';

const SearchContainer = () => {
  return (
    <Router>
      <div className={css.App}>
        <SearchForm />
        <div>Notification here?</div>
        <div>Search results or map here</div>
        <div>Free apartments or map here</div>
        <SearchResults />
      </div>
    </Router>
  );
};

export default SearchContainer;
