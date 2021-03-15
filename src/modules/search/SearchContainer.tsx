import React, { useEffect, useState } from 'react';
import SearchResults from './components/result/SearchResults';
import SearchForm from './components/form/SearchForm';
import Notification from '../../common/notification/Notification';
import useLang from '../../hooks/useLang';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';
import ErrorToast from '../../common/errorToast/ErrorToast';
import MapContainer from './components/result/MapResults';
import { groupProjectsByState } from './utils/groupProjectsByState';
import { useTranslation } from 'react-i18next';

const BREAK_POINT = 768;

const SearchContainer = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation();
  useLang();

  // Query, as in elasticsearch query params
  const { query, updateQuery } = useElasticsearchQuery();

  const { data: searchResults, isError } = useSearchResults(query);

  const { FOR_SALE: forSale = [], PRE_MARKETING: preMarketing = [] } = groupProjectsByState(searchResults);

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileSize = width <= BREAK_POINT;

  return (
    <div>
      <SearchForm onSubmit={updateQuery} />
      {isMobileSize ? (
        <Notification message={'Lorem ipsum dolor sit amet'} />
      ) : (
        <Notification
          message={
            'Duis ante tortor, dignissim vitae finibus at, pellentesque eget risus. Etiam nec mi ut lorem feugiat blandit nec a quam. Praesent luctus felis sit amet arcu imperdiet suscipit. Cras consectetur eros non lectus volutpat, sit amet ultricies nisi pellentesque. Mauris nec augue nec neque faucibus eleifend quis eu lacus.'
          }
        />
      )}
      {showMap ? (
        <MapContainer searchResults={searchResults} closeMap={closeMap} />
      ) : (
        <>
          <SearchResults header={t('SEARCH:for-sale')} searchResults={forSale} openMap={openMap} />
          <SearchResults header={t('SEARCH:pre-marketing')} searchResults={preMarketing} showSearchAlert />
        </>
      )}
      {isError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
