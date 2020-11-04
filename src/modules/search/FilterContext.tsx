import React from 'react';
import useFilterConfig from './hooks/useFilterConfig';
import { FilterConfigs } from '../../types/common';

export const FilterContext = React.createContext<FilterConfigs | undefined>(undefined);

type Props = {
  children: JSX.Element;
};

const FilterContextProvider = ({ children }: Props) => {
  const { data } = useFilterConfig();
  return <FilterContext.Provider value={data}>{children}</FilterContext.Provider>;
};

export default FilterContextProvider;
