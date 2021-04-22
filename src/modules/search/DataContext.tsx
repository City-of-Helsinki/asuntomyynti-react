import React from 'react';
import { QueryResult } from 'react-query/types/core/types';
import useDataConfig from './hooks/useDataConfig';
import { DataConfig } from '../../types/common';

export const DataContext = React.createContext<QueryResult<DataConfig> | undefined>(undefined);

type Props = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: Props) => {
  const config = useDataConfig();
  return <DataContext.Provider value={config}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
