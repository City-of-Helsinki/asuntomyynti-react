import { useHistory } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import useQuery from '../../hooks/useQuery';
import useFilter, { FilterItem, FilterType, FilterConfig } from '../../hooks/useFilter';
import RangeField from '../RangeField';
import CheckList from '../CheckList';
import InputField from '../InputField';
import { parseSelected } from '../../helpers';

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
      const selected = parseSelected(searchParams, name);
      return (
        <CheckList
          label={isWrapped ? undefined : label} // Omit label when wrapped
          items={items as string[]}
          selected={selected}
          name={name}
          onChange={updateQueryParams}
        />
      );

    case FilterType.Range:
      // Casting the types here to please the TypeScript gods
      const [from, to] = items;
      const values = parseSelected(searchParams, name);
      return (
        <RangeField onChange={updateQueryParams} values={values} from={from as FilterItem} to={to as FilterItem} />
      );

    case FilterType.Input:
      return <InputField label={label} value={searchParams.get(name) || ''} onChange={updateQueryParam} />;

    default:
      return null;
  }
};

export default QueryFilter;
