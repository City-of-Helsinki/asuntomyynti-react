import { FilterName, QueryParams } from '../types/common';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DataContext } from '../modules/search/DataContext';
import useFilters from './useFilters';

const useElasticsearchQuery = () => {
  const [query, setQuery] = useState({});
  const { data: config } = useContext(DataContext) || {};
  const { getFilters } = useFilters();

  const buildQuery = useCallback(() => {
    if (!config) {
      return {};
    }

    const { filters } = config;

    if (!filters) {
      return {};
    }

    const queryFilters = (Object.keys(filters) as FilterName[]).reduce((allFilters: QueryParams[], name) => {
      const values = getFilters(name);
      const { getQuery } = filters[name] || {};

      if (values.length === 0 || !getQuery) {
        return allFilters;
      }

      return [...allFilters, ...getQuery(values)];
    }, []);

    if (queryFilters.length === 0) {
      return {};
    }

    return {
      query: {
        bool: {
          must: queryFilters,
        },
      },
    };
  }, [config, getFilters]);

  const updateQuery = useCallback(() => {
    const localQuery = buildQuery();
    setQuery(localQuery);
  }, [buildQuery]);

  useEffect(() => {
    // Update query ONCE when the config is loaded and when manually triggered
    updateQuery();
    // eslint-disable-next-line
  }, [config]);

  return { query, updateQuery };
};

export default useElasticsearchQuery;
