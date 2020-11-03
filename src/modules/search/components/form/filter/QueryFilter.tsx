import React, { useCallback, useEffect } from 'react';
import useSearchParams from '../../../../../hooks/useSearchParams';
import RangeInput from './RangeInput';
import CheckList from './CheckList';
import { FilterItem, FilterConfig, FilterType, FilterName } from '../../../../../types/common';
import PriceInput from './PriceInput';

type Props = {
  name: FilterName;
  onFilter?: (props: FilterConfig) => void;
  isWrapped?: boolean;
} & FilterConfig;

/**
 * Render filter depending on the configuration and query params
 */
const QueryFilter = ({ name, onFilter, isWrapped = false, items, type, label, ...rest }: Props) => {
  // Get the current params
  const searchParams = useSearchParams();

  const filterCallback = useCallback(() => {
    onFilter && onFilter({ label, type, items, ...rest });
    // eslint-disable-next-line
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
      return <PriceInput name={name} label={label} isWrapped={isWrapped} items={items as FilterItem[]} />;

    default:
      return null;
  }
};

export default QueryFilter;
