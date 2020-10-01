import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import css from './SearchContainer.module.scss';
import SearchResults from './SearchResults';
import SearchForm from '../../components/SearchForm';

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await axios.get('http://dev.asuntomyynti-elastic.druidfi.wod.by/_search');
        setSearchResults(data?.data?.hits?.hits.map((x: any) => x._source) || []);
      } catch (e) {
        // TODO
      }
    };
    fetchProjects();
  }, []);

  console.warn(searchResults);

  return (
    <Router>
      <div className={css.App}>
        <SearchForm />
        <div>Notification here?</div>
        <div>Search results or map here</div>
        <div>Free apartments or map here</div>
        <SearchResults searchResults={searchResults} />
      </div>
    </Router>
  );
};

export default SearchContainer;
