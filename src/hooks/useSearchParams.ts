import useQuery from './useQuery';
import { getParamsByName } from '../utils/getParamsByName';
import { useHistory } from 'react-router-dom';

const useSearchParams = () => {
  const query = useQuery();
  const history = useHistory();

  const getAllValues = () => {
    return Array.from(query.entries()).reduce((all: { [name: string]: string }[], [name, values]) => {
      const items = values
        .split(',')
        .filter((value) => value !== '') // Don't render empty values
        .map((value) => ({ name, value }));

      return [...all, ...items];
    }, []);
  };

  const getValues = (name: string) => {
    return getParamsByName(query, name, []);
  };

  const getValue = (name: string) => {
    return query.get(name);
  };

  const setValue = (name: string, value: string) => {
    if (value === '') {
      query.delete(name);
    } else {
      query.set(name, value);
    }
    history.push(`?${query.toString()}`);
  };

  const setValues = (name: string, values: string[]) => {
    setValue(name, values.join(','));
  };

  const addValue = (name: string, value: string) => {
    const values = getParamsByName(query, name, []);
    values.push(value);
    setValue(name, values.join(','));
  };

  const removeValue = (name: string, value: string) => {
    const values = getParamsByName(query, name, []);
    const filteredValues = values.filter((x: string) => x !== value);
    setValue(name, filteredValues.join(','));
  };

  const clearValues = (name: string) => {
    query.delete(name);
    history.push(`?${query.toString()}`);
  };

  return { getAllValues, getValues, getValue, addValue, setValue, setValues, removeValue, clearValues };
};

export default useSearchParams;
