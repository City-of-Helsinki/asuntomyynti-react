import React, { useState } from 'react';
import SearchResults from './components/result/SearchResults';
import SearchForm from './components/form/SearchForm';
import Notification from '../../common/notification/Notification';
import useLang from '../../hooks/useLang';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';
import ErrorToast from '../../common/errorToast/ErrorToast';
import MapContainer from './components/result/MapResults';

const SearchContainer = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  useLang();

  // Query, as in elasticsearch query params
  const { query, updateQuery } = useElasticsearchQuery();

  const { data: searchResults, isError } = useSearchResults(query);

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  return (
    <div>
      <SearchForm onSubmit={updateQuery} />
      <Notification
        message={
          'Duis ante tortor, dignissim vitae finibus at, pellentesque eget risus. Etiam nec mi ut lorem feugiat blandit nec a quam. Praesent luctus felis sit amet arcu imperdiet suscipit. Cras consectetur eros non lectus volutpat, sit amet ultricies nisi pellentesque. Mauris nec augue nec neque faucibus eleifend quis eu lacus.'
        }
      />
      {showMap ? (
        <MapContainer searchResults={searchResults} closeMap={closeMap} />
      ) : (
        <SearchResults searchResults={searchResults} openMap={openMap} />
      )}
      {isError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
