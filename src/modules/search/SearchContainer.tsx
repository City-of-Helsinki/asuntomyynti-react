import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchResults from './components/result/list/SearchResults';
import SearchForm from './components/form/SearchForm';
import InfoBlock from '../../common/infoblock/InfoBlock';
import useLang from '../../hooks/useLang';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';
import ErrorToast from '../../common/errorToast/ErrorToast';
import MapContainer from './components/result/map/MapResults';
import { groupProjectsByState } from './utils/groupProjectsByState';
import useSearchParams from '../../hooks/useSearchParams';
import { DataContext } from './DataContext';

// "boolean" as a string because env variables are also treated as strings
const showUpcomingOnly = process.env.REACT_APP_SHOW_UPCOMING_ONLY || 'false';

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

  const { FOR_SALE: forSale = [], PRE_MARKETING: preMarketing = [], UPCOMING: upcoming = [] } = groupProjectsByState(
    searchResults
  );

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  if (showUpcomingOnly === 'true') {
    return (
      <div>
        {showMap ? (
          <MapContainer
            config={config}
            header={t('SEARCH:upcoming')}
            searchResults={upcoming}
            closeMap={closeMap}
            currentLang={currentLang}
            resultCountByProjects
          />
        ) : (
          <>
            <SearchResults
              config={config}
              header={t('SEARCH:upcoming')}
              searchResults={upcoming}
              openMap={openMap}
              showSearchAlert
              currentLang={currentLang}
              resultCountByProjects
            />
          </>
        )}
        {isSearchQueryError && <ErrorToast />}
      </div>
    );
  }

  return (
    <div>
      <SearchForm config={config} isLoading={isLoading} isError={isError} onSubmit={updateQuery} />
      {config && !isError && <InfoBlock config={config} />}
      {showMap ? (
        <MapContainer
          config={config}
          header={t('SEARCH:all-apartments')}
          searchResults={searchResults}
          closeMap={closeMap}
          currentLang={currentLang}
        />
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
            currentLang={currentLang}
          />
        </>
      )}
      {isSearchQueryError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
