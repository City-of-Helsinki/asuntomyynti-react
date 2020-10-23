import useSearchParams from './useSearchParams';
import { getParamsByName } from '../utils/getParamsByName';
import { useHistory } from 'react-router-dom';
import { FilterConfigs, FilterName } from '../types/common';
import useFilterConfig from '../modules/search/hooks/useFilterConfig';

const useFilters = () => {
  const query = useSearchParams();
  const history = useHistory();

  const getAllFilters = () => {
    return Array.from(query.entries()).filter(([name, value]) => value !== '') as [FilterName, string][];
  };

  const getFilters = (name: string): string[] => {
    return getParamsByName(query, name, []);
  };

  const getFilter = (name: string): string => {
    return query.get(name) || '';
  };

  const setFilter = (name: string, value: string) => {
    query.set(name, value);
    history.push(`?${query.toString()}`);
  };

  // Set array as value
  const setFilters = (name: string, values: string[]) => {
    setFilter(name, values.join(','));
  };

  // Add item to a list
  const addFilter = (name: string, value: string) => {
    const values = getParamsByName(query, name, []);
    values.push(value);
    setFilter(name, values.join(','));
  };

  // Remove item from a list
  const removeFilter = (name: string, value: string) => {
    const values = getParamsByName(query, name, []);
    const filteredValues = values.filter((x: string) => x !== value);

    if (filteredValues.length === 0) {
      query.delete(name);
      history.push(`?${query.toString()}`);
      return;
    }

    setFilter(name, filteredValues.join(','));
  };

  const clearFilter = (name: string) => {
    query.delete(name);
    history.push(`?${query.toString()}`);
  };

  const clearAllFilters = (filterConfig: FilterConfigs) => {
    Object.keys(filterConfig).forEach((name) => {
      console.log(name);
      query.delete(name);
    });
    history.push(`?${query.toString()}`);
  };

  const hasFilters = (filterConfig: FilterConfigs) => {
    return Object.keys(filterConfig).some((name) => {
      return !!query.get(name);
    });
  };

  return {
    hasFilters,
    clearAllFilters,
    getAllFilters,
    getFilter,
    getFilters,
    addFilter,
    setFilter,
    setFilters,
    removeFilter,
    clearFilter,
  };
};

export default useFilters;
