import { QueryParams } from '../types/common';
import axios from 'axios';
import { useQuery } from 'react-query';
import mapSearchResults from '../modules/search/utils/mapSearchResults';
import filterApartmentA0 from '../modules/search/utils/filterApartmentA0';

const searchPath = process.env.REACT_APP_ELASTICSEARCH_PATH || 'elasticsearch';

const useSearchResults = (
  query: { query?: QueryParams },
  queryHeaders: { token?: string },
  currentLang: string,
  keepA0 = false
) => {
  const fetchProjects = async () => {
    // Wait for token before trying to fetch data
    if (!queryHeaders.token) {
      return [];
    }

    const queryAsJSON = JSON.stringify(query);

    const { data } = await axios.post(`/${currentLang}/${searchPath}`, queryAsJSON, {
      headers: {
        'X-CSRF-TOKEN': queryHeaders.token,
        'Content-Type': 'application/json',
      },
    });

    const dataAsArray: any = Object.values(data);

    const mappedSearchResults = dataAsArray?.map(mapSearchResults) || [];
    if (keepA0) {
      return mappedSearchResults;
    } else {
      return filterApartmentA0(mappedSearchResults);
    }
  };

  // Fetch when query or queryHeaders update
  return useQuery(['searchResults', query, queryHeaders], fetchProjects, {
    initialStale: true,
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

export default useSearchResults;
