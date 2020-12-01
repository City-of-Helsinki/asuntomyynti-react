import React from 'react';
import useFilterConfig from './hooks/useFilterConfig';
import { FilterConfigs } from '../../types/common';
import { QueryResult } from 'react-query/types/core/types';

export const FilterContext = React.createContext<QueryResult<FilterConfigs> | undefined>(undefined);

type Props = {
  children: JSX.Element;
};

const FilterContextProvider = ({ children }: Props) => {
  const config = useFilterConfig();
  return <FilterContext.Provider value={config}>{children}</FilterContext.Provider>;
};

export default FilterContextProvider;
