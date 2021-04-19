import React, { useState } from 'react';
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

const SearchContainer = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const { t } = useTranslation();
  useLang();

  const searchQuery = useSearchParams();
  const currentLang = searchQuery.get('lang') || 'fi';

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

  return (
    <div>
      <SearchForm onSubmit={updateQuery} />
      <InfoBlock
        message={
          'Duis ante tortor, dignissim vitae finibus at, pellentesque eget risus. Etiam nec mi ut lorem feugiat blandit nec a quam. Praesent luctus felis sit amet arcu imperdiet suscipit. Cras consectetur eros non lectus volutpat, sit amet ultricies nisi pellentesque.'
        }
        messageMobile={'Lorem ipsum dolor sit amet.'}
        messageMinified={'Lorem ipsum'}
        url="#"
      />
      {showMap ? (
        <MapContainer searchResults={searchResults} closeMap={closeMap} currentLang={currentLang} />
      ) : (
        <>
          <SearchResults
            header={t('SEARCH:for-sale')}
            searchResults={forSale}
            openMap={openMap}
            currentLang={currentLang}
          />
          <SearchResults
            header={t('SEARCH:pre-marketing')}
            searchResults={preMarketing}
            showSearchAlert
            currentLang={currentLang}
          />
        </>
      )}
      {isError && <ErrorToast />}
    </div>
  );
};

export default SearchContainer;
