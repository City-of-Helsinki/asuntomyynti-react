import { buildQuery } from '../utils/query';
import useQuery from './useQuery';
import { FilterConfig } from '../types/common';
import { useEffect, useState } from 'react';

const useElasticsearchQuery = (config: FilterConfig) => {
  const [query, setQuery] = useState();
  const searchParams = useQuery();

  const updateQuery = () => {
    const localQuery = buildQuery(config, searchParams);
    setQuery(localQuery);
  };

  useEffect(() => {
    // Update query once on mount and then only by calling updateQuery
    updateQuery();
  }, []);

  return { query, updateQuery };
};

export default useElasticsearchQuery;
