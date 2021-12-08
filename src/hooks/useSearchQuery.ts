import { FilterName, StateOfSale, QueryParams } from '../types/common';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DataContext } from '../modules/search/DataContext';
import useFilters from './useFilters';

const useSearchQuery = (projectOwnershipType: string, showUpcomingOnly: string) => {
  const [query, setQuery] = useState({});
  const { data: config } = useContext(DataContext) || {};
  const { getFilters } = useFilters();

  const buildQuery = useCallback(() => {
    if (!config) return {};

    const { filters } = config;
    if (!filters) return {};

    const queryFilters = (Object.keys(filters) as FilterName[]).reduce((allFilters: QueryParams, name) => {
      const values = getFilters(name);
      const { getQuery } = filters[name] || {};

      if (values.length === 0 || !getQuery) {
        return allFilters;
      }

      allFilters[name] = values;

      return { ...allFilters, ...getQuery(values) };
    }, {});

    return queryFilters;
  }, [config, getFilters]);

  const updateQuery = useCallback(() => {
    const localQuery = buildQuery();

    // Always include project ownership type in the query
    const ownershipType = { project_ownership_type: projectOwnershipType };

    // Always use UPCOMING in the query if it's set to true
    let upcoming = {};
    if (showUpcomingOnly.toLowerCase() === 'true') {
      upcoming = {
        project_state_of_sale: [StateOfSale.Upcoming],
      };
    }

    const combinedQuery = { ...localQuery, ...ownershipType, ...upcoming };

    setQuery(combinedQuery);
  }, [buildQuery, projectOwnershipType, showUpcomingOnly]);

  useEffect(() => {
    // Update query ONCE when the config is loaded and when manually triggered
    updateQuery();
    // eslint-disable-next-line
  }, [config]);

  return { query, updateQuery };
};

export default useSearchQuery;
