import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from './components/result/SearchResults';
import SearchForm from './components/form/SearchForm';
import Notification from '../../common/notification/Notification';
import useLang from '../../hooks/useLang';
import useQuery from '../../hooks/useQuery';
import { buildQuery } from '../../utils/helpers';
import useFilters from './components/form/filter/useFilters';
import mapSearchResults from "./utils/mapSearchResults";

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState([]);
  // Query, as in elasticsearch query params
  const [query, setQuery] = useState({});
  // URL search params
  const searchParams = useQuery();
  // TODO: Consider saving config to context for easier access
  const filterConfig = useFilters();

  useLang();

  // Fetch when queryParams update
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await axios.post('http://dev.asuntomyynti-elastic.druidfi.wod.by/_search', {
          ...query,
          collapse: {
            field: 'project_id',
            inner_hits: {
              size: 666,
              name: 'project_id',
            },
          },
        });
        setSearchResults(data?.data?.hits?.hits.map(mapSearchResults) || []);
      } catch (e) {
        // TODO
      }
    };
    fetchProjects();
  }, [query]);

  // Update params on mount
  useEffect(() => {
    updateQuery();
  }, []);

  // Generate query based on the search params
  const updateQuery = () => {
    const query = buildQuery(filterConfig, searchParams);
    setQuery(query);
  };

  return (
    <div>
      <SearchForm config={filterConfig} onSubmit={updateQuery} />
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
