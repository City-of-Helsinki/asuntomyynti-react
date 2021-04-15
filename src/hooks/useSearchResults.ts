import { QueryParams } from '../types/common';
import axios from 'axios';
import { useQuery } from 'react-query';
import mapSearchResults from '../modules/search/utils/mapSearchResults';

const searchUrl = process.env.REACT_APP_ELASTIC_BASE_URL || 'http://dev.asuntomyynti-elastic.druidfi.wod.by/_search';

const useSearchResults = (query: { query?: QueryParams }) => {
  const fetchProjects = async () => {
    const { data } = await axios.post(searchUrl, {
      ...query,
      collapse: {
        field: 'project_id',
        inner_hits: {
          size: 666,
          name: 'project_id',
        },
      },
    });
    return data?.hits?.hits.map(mapSearchResults) || [];
  };

  // Fetch when queryParams update
  return useQuery(['searchResults', query], fetchProjects, { initialStale: true, initialData: [] });
};

export default useSearchResults;
