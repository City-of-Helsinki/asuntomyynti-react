import { FilterName, QueryParams } from '../types/common';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FilterContext } from '../modules/search/FilterContext';
import useFilters from './useFilters';

const useElasticsearchQuery = () => {
  const [query, setQuery] = useState({});
  const config = useContext(FilterContext);
  const { getFilters } = useFilters();

  const buildQuery = useCallback(() => {
    if (!config) {
      return {};
    }

    const filters = (Object.keys({}) as FilterName[]).reduce((filters: QueryParams[], name) => {
      const values = getFilters(name);
      const { getQuery } = config[name] || {};

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
  }, [config, getFilters]);

  const updateQuery = useCallback(() => {
    const localQuery = buildQuery();
    setQuery(localQuery);
  }, [buildQuery]);

  useEffect(() => {
    // Update query once on mount and then only by calling updateQuery
    updateQuery();
  }, [updateQuery]);

  return { query, updateQuery };
};

export default useElasticsearchQuery;
