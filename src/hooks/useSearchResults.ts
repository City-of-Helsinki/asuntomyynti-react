import { QueryParams } from '../types/common';
import axios from 'axios';
import { useQuery } from 'react-query';
import { mapSearchResults } from '../utils/mapSearchResults';

const useSearchResults = (query: QueryParams) => {
  const fetchProjects = () =>
    axios.post('http://dev.asuntomyynti-elastic.druidfi.wod.by/_search', {
      ...query,
      collapse: {
        field: 'project_id',
        inner_hits: {
          size: 666,
          name: 'project_id',
        },
      },
    });

  // Fetch when queryParams update
  // {isLoading, isError, error} is available on the useQuery
  const { data } = useQuery('searchResults', fetchProjects);
  return data?.data?.hits?.hits.map(mapSearchResults) || [];
};

export default useSearchResults;
