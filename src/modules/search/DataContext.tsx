import React from 'react';
import { QueryResult } from 'react-query/types/core/types';
import { DataConfig } from '../../types/common';
import useDataConfig from './hooks/useDataConfig';
import useSearchParams from '../../hooks/useSearchParams';

export const DataContext = React.createContext<QueryResult<DataConfig> | undefined>(undefined);

type Props = {
  children: JSX.Element;
};

const DataContextProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const language = searchParams.get('lang') || 'fi';

  const config = useDataConfig(language);

  return <DataContext.Provider value={config}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
