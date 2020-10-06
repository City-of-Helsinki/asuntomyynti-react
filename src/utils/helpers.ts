import { FilterConfig, FilterType, QueryParams, QueryType } from '../types/common';
import mockSearchConfig from '../modules/search/form/filter/mocks/filter-config.json';

export const getValueFromParams = (searchParams: URLSearchParams, name: string, defaultValue?: any) => {
  const currentValue = searchParams.get(name);
  if (currentValue) {
    return currentValue.split(',');
  }
  return defaultValue;
};

const getQueryByType = (type: QueryType, key: string, values: string[]): QueryParams => {
  switch (type) {
    case QueryType.LessThan:
      const [value] = values;
      return {
        range: {
          [key]: {
            lte: parseInt(value),
          },
        },
      };

    case QueryType.SetOfStrings:
      return {
        terms: {
          [key]: values,
        },
      };

    case QueryType.SetOfNumbers:
      return {
        terms: {
          [key]: values.map((x) => parseInt(x)),
        },
      };

    case QueryType.Range:
      const [gte, lte] = values.map((x) => parseInt(x));
      return {
        range: {
          [key]: {
            // Add key and value only if has value
            ...(gte ? { gte } : {}),
            ...(lte ? { lte } : {}),
          },
        },
      };

    default:
      return {};
  }
};

export const searchParamsToQuery = (filterConfig: FilterConfig, searchParams: URLSearchParams) => {
  const filters = Object.keys(filterConfig).reduce((filters: QueryParams[], key) => {
    const hasValues = !!searchParams.get(key);
    const { query_type } = filterConfig[key];
    const value = getValueFromParams(searchParams, key);

    if (!hasValues || !query_type || !value) {
      return filters;
    }

    return [...filters, getQueryByType(query_type, key, value)];
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
export const fetchFilterConfig = (): Promise<FilterConfig> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSearchConfig as FilterConfig);
    }, 1000);
  });
