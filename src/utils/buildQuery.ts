import { FilterConfig, QueryParams } from '../types/common';
import { getParamsByName } from './getParamsByName';

export const buildQuery = (filterConfig: FilterConfig, searchParams: URLSearchParams) => {
  const filters = Object.keys(filterConfig).reduce((filters: QueryParams[], key) => {
    const hasValues = !!searchParams.get(key);
    const values = getParamsByName(searchParams, key);
    const { getQuery } = filterConfig[key];
    if (!hasValues || !values) {
      return filters;
    }

    return [...filters, ...getQuery(values)];
  }, []);

  return {
    query: {
      bool: {
        must: filters,
      },
    },
  };
};
