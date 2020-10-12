import React from 'react';
import SearchResults from './components/result/SearchResults';
import SearchForm from './components/form/SearchForm';
import Notification from '../../common/notification/Notification';
import useLang from '../../hooks/useLang';
import useFilters from './hooks/useFilters';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';

const SearchContainer = () => {
  useLang();

  // TODO: Consider saving config to context for easier access
  const filterConfig = useFilters();

  // Query, as in elasticsearch query params
  const { query, updateQuery } = useElasticsearchQuery(filterConfig);
  const searchResults = useSearchResults(query);

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
