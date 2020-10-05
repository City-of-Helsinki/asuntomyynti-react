import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import useFilter, { FilterItem, FilterType, FilterConfig } from './useFilter';
import useQuery from '../../../../hooks/useQuery';
import RangeInput from './RangeInput';
import CheckList from './CheckList';
import { TextInput } from 'hds-react';
import { parseQueryParam } from '../../../../utils/helpers';
import styles from './QueryFilter.module.scss';

type Props = {
  name: string;
  onFilter?: (props: FilterConfig) => void;
  isWrapped?: boolean;
};

/**
 * Render filter depending on the configuration and query params
 */
const QueryFilter = ({ name, onFilter, isWrapped = false }: Props) => {
  // Fetch configuration based on the name
  const { items, type, label } = useFilter(name);
  // Get the current params
  const searchParams = useQuery();
  const history = useHistory();

  const filterCallback = useCallback(() => {
    onFilter && onFilter({ label, type, items });
  }, [items, label, onFilter, type]);

  // Update parent on mount
  useEffect(() => {
    filterCallback();
  }, [searchParams, filterCallback]);

  const updateQueryParam = (value: string) => {
    searchParams.set(name, value);
    history.push(`?${searchParams.toString()}`);
  };

  const updateQueryParams = (values: string[]) => {
    searchParams.set(name, values.join(','));
    history.push(`?${searchParams.toString()}`);
  };

  switch (type) {
    case FilterType.MultiSelect:
      const selected = parseQueryParam(searchParams, name);
      return (
        <CheckList
          label={label}
          isWrapped={isWrapped}
          items={items as string[]}
          selected={selected}
          name={name}
          onChange={updateQueryParams}
        />
      );

    case FilterType.Range:
      const [from, to] = items;
      const [min = '', max = ''] = parseQueryParam(searchParams, name);
      // Casting the types here to please the TypeScript gods
      return (
        <RangeInput onChange={updateQueryParams} values={[min, max]} from={from as FilterItem} to={to as FilterItem} />
      );

    case FilterType.Input:
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateQueryParam(event.target.value || '');
      };
      return (
        <TextInput
          id={`${name}-${label}`}
          label={label}
          value={searchParams.get(name) || ''}
          onChange={handleChange}
          className={`${isWrapped ? styles.padding : ''}`}
          {...items[0]}
        />
      );

    default:
      return null;
  }
};

export default QueryFilter;
