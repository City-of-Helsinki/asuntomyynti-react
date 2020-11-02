import { FilterConfigs, FilterName, QueryParams } from '../types/common';
import { useEffect, useState } from 'react';
import useFilters from './useFilters';

const useElasticsearchQuery = (config: Partial<FilterConfigs>) => {
  const [query, setQuery] = useState({});
  const { getFilters } = useFilters();

  const buildQuery = () => {
    const filters = Object.keys(config).reduce((filters: QueryParams[], name) => {
      const values = getFilters(name);
      const { getQuery } = config[name as FilterName] || {};

      if (values.length === 0 || !getQuery) {
        return filters;
      }

      return [...filters, ...getQuery(values)];
    }, []);

    if (filters.length === 0) {
      return {};
    }

    return {
      query: {
        bool: {
          must: filters,
        },
      },
    };
  };

  const updateQuery = () => {
    const localQuery = buildQuery();
    setQuery(localQuery);
  };

  useEffect(() => {
    // Update query once on mount and then only by calling updateQuery
    updateQuery();
  }, []);

  return { query, updateQuery };
};

export default useElasticsearchQuery;
