import React, { useCallback, useEffect } from 'react';
import useSearchParams from '../../../../../hooks/useSearchParams';
import RangeInput from './RangeInput';
import CheckList from './CheckList';
import { TextInput } from 'hds-react';
import { FilterItem, FilterConfig, FilterType } from '../../../../../types/common';
import useFilters from '../../../../../hooks/useFilters';

type Props = {
  name: string;
  onFilter?: (props: FilterConfig) => void;
  isWrapped?: boolean;
} & FilterConfig;

/**
 * Render filter depending on the configuration and query params
 */
const QueryFilter = ({ name, onFilter, isWrapped = false, items, type, label, ...rest }: Props) => {
  // Get the current params
  const searchParams = useSearchParams();
  const { setFilter, getFilter } = useFilters();

  const filterCallback = useCallback(() => {
    onFilter && onFilter({ label, type, items, ...rest });
  }, [items, label, onFilter, type]);

  // Update parent on mount
  useEffect(() => {
    filterCallback();
  }, [searchParams, filterCallback]);

  switch (type) {
    case FilterType.MultiSelect:
      return <CheckList name={name} label={label} isWrapped={isWrapped} items={items as string[]} />;

    case FilterType.Range:
      const [from, to] = items;
      // Casting the types here to please the TypeScript gods
      return <RangeInput name={name} from={from as FilterItem} to={to as FilterItem} />;

    case FilterType.Input:
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(name, event.target.value || '');
      };
      return (
        <TextInput
          id={`${name}-${label}`}
          label={label}
          value={getFilter(name) || ''}
          onChange={handleChange}
          style={isWrapped ? { padding: '14px' } : {}}
          {...items[0]}
        />
      );

    default:
      return null;
  }
};

export default QueryFilter;
