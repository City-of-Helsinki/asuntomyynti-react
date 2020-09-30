import React, {useEffect, useState} from 'react';
import css from './SearchContainer.module.scss';
import SearchResults from './SearchResults';
import axios from 'axios';

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
    <div className={css.App}>
      <div>Search parameters here</div>
      <div>Notification here?</div>
      <div>Search results or map here</div>
      <div>Free apartments or map here</div>
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchContainer;
