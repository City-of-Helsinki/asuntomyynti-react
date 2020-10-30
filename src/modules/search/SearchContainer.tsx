import React from 'react';
import SearchResults from './components/result/SearchResults';
import SearchForm from './components/form/SearchForm';
import Notification from '../../common/notification/Notification';
import useLang from '../../hooks/useLang';
import useFilterConfig from './hooks/useFilterConfig';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';
import ErrorToast from '../../common/errorToast/ErrorToast';
import MapContainer from "./components/result/MapContainer";

const SearchContainer = () => {
  useLang();

  // TODO: Consider saving config to context for easier access
  const { isLoading: filterConfigIsLoading, data: filterConfig, isError: configError } = useFilterConfig();

  // Query, as in elasticsearch query params
  const { query, updateQuery } = useElasticsearchQuery(filterConfig || {});

  const { data: searchResults, isError: searchError } = useSearchResults(query);

  const isError = configError || searchError;

  return (
    <div>
      <SearchForm isLoading={filterConfigIsLoading} config={filterConfig} onSubmit={updateQuery} />
      <Notification
        message={
          'Duis ante tortor, dignissim vitae finibus at, pellentesque eget risus. Etiam nec mi ut lorem feugiat blandit nec a quam. Praesent luctus felis sit amet arcu imperdiet suscipit. Cras consectetur eros non lectus volutpat, sit amet ultricies nisi pellentesque. Mauris nec augue nec neque faucibus eleifend quis eu lacus.'
        }
      />
      <MapContainer searchResults={searchResults} />
      <SearchResults searchResults={searchResults} />
      {isError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
