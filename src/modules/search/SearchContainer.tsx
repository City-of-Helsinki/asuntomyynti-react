import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchResults from './components/result/SearchResults';
import SearchForm from './components/form/SearchForm';
import InfoBlock from '../../common/infoblock/InfoBlock';
import useLang from '../../hooks/useLang';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';
import ErrorToast from '../../common/errorToast/ErrorToast';
import MapContainer from './components/result/MapResults';
import { groupProjectsByState } from './utils/groupProjectsByState';
import useSearchParams from '../../hooks/useSearchParams';
import { DataContext } from './DataContext';

const SearchContainer = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const { t } = useTranslation();

  useLang();

  const searchQuery = useSearchParams();
  const currentLang = searchQuery.get('lang') || 'fi';

  // Initialize API data
  const { data: config, isLoading, isError } = useContext(DataContext) || {};

  // Query, as in elasticsearch query params
  const { query, updateQuery } = useElasticsearchQuery();

  const { data: searchResults, isError: isSearchQueryError } = useSearchResults(query);

  const { FOR_SALE: forSale = [], PRE_MARKETING: preMarketing = [] } = groupProjectsByState(searchResults);

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  return (
    <div>
      <SearchForm config={config} isLoading={isLoading} isError={isError} onSubmit={updateQuery} />
      {config && !isError && <InfoBlock config={config} />}
      {showMap ? (
        <MapContainer config={config} searchResults={searchResults} closeMap={closeMap} currentLang={currentLang} />
      ) : (
        <>
          <SearchResults
            config={config}
            header={t('SEARCH:for-sale')}
            searchResults={forSale}
            openMap={openMap}
            currentLang={currentLang}
          />
          <SearchResults
            config={config}
            header={t('SEARCH:pre-marketing')}
            searchResults={preMarketing}
            showSearchAlert
            currentLang={currentLang}
          />
        </>
      )}
      {isSearchQueryError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
