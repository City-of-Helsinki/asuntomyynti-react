import { FilterConfig, QueryParams, RawFilterConfig } from '../types/common';
import mockSearchConfig from '../modules/search/form/filter/mocks/filter-config.json';

export const getValueFromParams = (searchParams: URLSearchParams, name: string, defaultValue?: any) => {
  const currentValue = searchParams.get(name);
  if (currentValue) {
    return currentValue.split(',');
  }
  return defaultValue;
};

export const buildQuery = (filterConfig: FilterConfig, searchParams: URLSearchParams) => {
  const filters = Object.keys(filterConfig).reduce((filters: QueryParams[], key) => {
    const hasValues = !!searchParams.get(key);
    const values = getValueFromParams(searchParams, key);
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

// TODO: look into react-query for caching and such
export const fetchFilterConfig = (): Promise<RawFilterConfig> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSearchConfig as RawFilterConfig);
    }, 1000);
  });
