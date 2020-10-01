import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './SearchContainer.module.scss';
import SearchResults from './SearchResults';
import SearchForm from '../../components/SearchForm';
import Notification from '../../components/Notification/Notification';
import useLang from "../../hooks/useLang";

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState([]);
  useLang();

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

  return (
    <div className={css.App}>
      <SearchForm />
      <Notification
        message={
          'Duis ante tortor, dignissim vitae finibus at, pellentesque eget risus. Etiam nec mi ut lorem feugiat blandit nec a quam. Praesent luctus felis sit amet arcu imperdiet suscipit. Cras consectetur eros non lectus volutpat, sit amet ultricies nisi pellentesque. Mauris nec augue nec neque faucibus eleifend quis eu lacus.'
        }
      />
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchContainer;
