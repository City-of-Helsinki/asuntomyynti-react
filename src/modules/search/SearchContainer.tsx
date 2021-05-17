import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchResults from './components/result/list/SearchResults';
import SearchForm from './components/form/SearchForm';
import InfoBlock from '../../common/infoblock/InfoBlock';
import useElasticsearchQuery from '../../hooks/useElasticsearchQuery';
import useSearchResults from '../../hooks/useSearchResults';
import ErrorToast from '../../common/errorToast/ErrorToast';
import MapContainer from './components/result/map/MapResults';
import { groupProjectsByState } from './utils/groupProjectsByState';
import useSearchParams from '../../hooks/useSearchParams';
import { DataContext } from './DataContext';
import { filterProjectsByOwnershipType } from './utils/filterProjectsByOwnershipType';

// "boolean" as a string because env variables are also treated as strings
const showUpcomingOnly = process.env.REACT_APP_SHOW_UPCOMING_ONLY || 'false';

// Read project_ownership_type from env variables, defaults to hitas (includes puolihitas)
const projectOwnershipType = process.env.REACT_APP_PROJECT_OWNERSHIP_TYPE || 'hitas';

const SearchContainer = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  // Get current language from url parameters
  const searchQuery = useSearchParams();
  const currentLang = searchQuery.get('lang') || 'fi';

  // Set language
  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  // Get Config data from the initialize API
  const { data: config, isLoading, isError } = useContext(DataContext) || {};

  // Query, as in elasticsearch query params
  const { query, updateQuery } = useElasticsearchQuery();

  // Fetch results with current search query
  const { data: searchResults, isError: isSearchQueryError } = useSearchResults(query);

  // Set upcoming projects that inculde both HITAS and HASO apartments
  const { UPCOMING: upcoming = [] } = groupProjectsByState(searchResults);

  // Filter HITAS/HASO apartments by selected ownership type
  const filteredSearchResults = filterProjectsByOwnershipType(searchResults, projectOwnershipType);

  // Set FOR_SALE and PRE_MARKETING apartments from HITAS/HASO filtered lists
  const { FOR_SALE: forSale = [], PRE_MARKETING: preMarketing = [] } = groupProjectsByState(filteredSearchResults);

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
            hideApartments
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
              hideApartments
            />
          </>
        )}
        {isSearchQueryError && <ErrorToast />}
      </div>
    );
  }

  // Define page h1 based on project_ownership_type
  let pageTitle = t('SEARCH:hitas-title');

  if (projectOwnershipType.toLowerCase() === 'haso') {
    pageTitle = t('SEARCH:haso-title');
  }

  return (
    <div>
      <SearchForm
        config={config}
        isLoading={isLoading}
        isError={isError}
        pageTitle={pageTitle}
        onSubmit={updateQuery}
      />
      {config && !isError && <InfoBlock config={config} />}
      {showMap ? (
        <MapContainer
          config={config}
          header={t('SEARCH:all-apartments')}
          searchResults={filteredSearchResults}
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
