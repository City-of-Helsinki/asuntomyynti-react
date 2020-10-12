import useQuery from './useQuery';
import { getParamsByName } from '../utils/getParamsByName';
import { useHistory } from 'react-router-dom';
import { ParamList } from '../types/common';

const useSearchParams = () => {
  const query = useQuery();
  const history = useHistory();

  const getAllParams = (): ParamList => {
    return Array.from(query.entries()).reduce((all: ParamList, [name, values]) => {
      const items = values
        .split(',')
        .filter((value) => value !== '') // Filter empty values
        .map((value) => ({ name, value }));

      return [...all, ...items];
    }, []);
  };

  const getParams = (name: string): string[] => {
    return getParamsByName(query, name, []);
  };

  const getParam = (name: string): string => {
    return query.get(name) || '';
  };

  const setParam = (name: string, value: string) => {
    query.set(name, value);
    history.push(`?${query.toString()}`);
  };

  // Set array as value
  const setParams = (name: string, values: string[]) => {
    setParam(name, values.join(','));
  };

  // Add item to a list
  const addToParam = (name: string, value: string) => {
    const values = getParamsByName(query, name, []);
    values.push(value);
    setParam(name, values.join(','));
  };

  // Remove item from a list
  const removeFromParam = (name: string, value: string) => {
    const values = getParamsByName(query, name, []);
    const filteredValues = values.filter((x: string) => x !== value);

    if (filteredValues.length === 0) {
      query.delete(name);
      history.push(`?${query.toString()}`);
      return;
    }

    setParam(name, filteredValues.join(','));
  };

  const clearParam = (name: string) => {
    query.delete(name);
    history.push(`?${query.toString()}`);
  };

  return { getAllParams, getParams, getParam, addToParam, setParam, setParams, removeFromParam, clearParam };
};

export default useSearchParams;
