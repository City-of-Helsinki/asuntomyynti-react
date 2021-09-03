import { QueryParams } from '../types/common';
import axios from 'axios';
import { useQuery } from 'react-query';
import mapSearchResults from '../modules/search/utils/mapSearchResults';

const searchPath = process.env.REACT_APP_ELASTICSEARCH_PATH || 'elasticproxy';

const useSearchResults = (query: { query?: QueryParams }, queryHeaders: { token?: string }, currentLang: string) => {
  const fetchProjects = async () => {
    // Wait for token before trying to fetch data
    if (!queryHeaders.token) {
      return [];
    }

    const { data } = await axios.post(
      `/${currentLang}/${searchPath}`,
      {
        ...query,
        collapse: {
          field: 'project_id',
          inner_hits: {
            size: 666,
            name: 'project_id',
          },
        },
      },
      {
        headers: {
          'X-CSRF-TOKEN': queryHeaders.token,
        },
      }
    );

    return data?.hits?.hits.map(mapSearchResults) || [];
  };

  // Fetch when query or queryHeaders update
  return useQuery(['searchResults', query, queryHeaders], fetchProjects, {
    initialStale: true,
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

export default useSearchResults;
