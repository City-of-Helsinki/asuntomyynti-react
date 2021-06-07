import React, { useContext, useEffect, useRef } from 'react';
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
import useSessionStorageState from '../../hooks/useSessionStorageState';

// "boolean" as a string because env variables are also treated as strings
const showUpcomingOnly = process.env.REACT_APP_SHOW_UPCOMING_ONLY || 'false';

// Read project_ownership_type from env variables, defaults to hitas (includes puolihitas)
const projectOwnershipType = process.env.REACT_APP_PROJECT_OWNERSHIP_TYPE || 'hitas';

const SearchContainer = () => {
  const [showMap, setShowMap] = useSessionStorageState({ defaultValue: false, key: 'showMap' });
  const mapFocusRef = useRef<HTMLDivElement>(null);
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

  // Filter HITAS/HASO apartments by selected ownership type
  const filteredSearchResults = filterProjectsByOwnershipType(searchResults, projectOwnershipType);

  // Set READY, FOR_SALE, PRE_MARKETING and UPCOMING apartments from HITAS/HASO filtered lists
  const {
    READY: ready = [],
    FOR_SALE: forSale = [],
    PRE_MARKETING: preMarketing = [],
    UPCOMING: upcoming = [],
  } = groupProjectsByState(filteredSearchResults);

  const hasFreeApartments = !!ready.length;

  const openMap = () => {
    setShowMap(true);

    if (mapFocusRef.current) {
      mapFocusRef.current.focus();
    }
  };

  const closeMap = () => {
    setShowMap(false);

    if (mapFocusRef.current) {
      mapFocusRef.current.focus();
    }
  };

  if (showUpcomingOnly === 'true') {
    return (
      <div>
        <div ref={mapFocusRef} tabIndex={-1} />
        {showMap ? (
          <section aria-label={t('SEARCH:aria-label-map-results')}>
            <MapContainer
              config={config}
              header={t('SEARCH:upcoming')}
              searchResults={upcoming}
              closeMap={closeMap}
              currentLang={currentLang}
              resultCountByProjects
              hideApartments
            />
          </section>
        ) : (
          <section aria-label={t('SEARCH:aria-label-list-results')}>
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
          </section>
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
        projectOwnershipType={projectOwnershipType}
      />
      {config && !isError && <InfoBlock config={config} type={projectOwnershipType} />}
      <div ref={mapFocusRef} tabIndex={-1} />
      {showMap ? (
        <section aria-label={t('SEARCH:aria-label-map-results')}>
          <MapContainer
            config={config}
            header={t('SEARCH:all-apartments')}
            searchResults={filteredSearchResults}
            closeMap={closeMap}
            currentLang={currentLang}
          />
        </section>
      ) : (
        <section aria-label={t('SEARCH:aria-label-list-results')}>
          {hasFreeApartments ? (
            <>
              <SearchResults
                config={config}
                header={t('SEARCH:free-apartments')}
                searchResults={ready}
                openMap={openMap}
                currentLang={currentLang}
              />
              <SearchResults
                config={config}
                header={t('SEARCH:for-sale')}
                searchResults={forSale}
                currentLang={currentLang}
              />
            </>
          ) : (
            <SearchResults
              config={config}
              header={t('SEARCH:for-sale')}
              searchResults={forSale}
              openMap={openMap}
              currentLang={currentLang}
            />
          )}
          <SearchResults
            config={config}
            header={t('SEARCH:pre-marketing')}
            searchResults={preMarketing}
            currentLang={currentLang}
          />
        </section>
      )}
      {isSearchQueryError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
