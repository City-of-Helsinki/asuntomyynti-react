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

    const filters = (Object.keys(config) as FilterName[]).reduce((filters: QueryParams[], name) => {
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
    // Update query ONCE when the config is loaded and when manually triggered
    updateQuery();
    // eslint-disable-next-line
  }, [config]);

  return { query, updateQuery };
};

export default useElasticsearchQuery;
