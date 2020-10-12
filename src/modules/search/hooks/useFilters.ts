import { useEffect, useState } from 'react';
import { FilterConfig } from '../../../types/common';
import { fetchFilterConfig } from '../../../utils/helpers';
import filterMap from '../utils/filterMap';

const enhanceConfig = (config: { [key: string]: {} }) => {
  return Object.keys(filterMap).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: {
        ...config[key],
        ...filterMap[key],
      },
    };
  }, {});
};

const useFilters = () => {
  const [config, setConfig] = useState<FilterConfig>({});

  useEffect(() => {
    const updateFilterConfig = async () => {
      const config = await fetchFilterConfig();
      setConfig(enhanceConfig(config));
    };
    updateFilterConfig();
  }, []);

  return config;
};

export default useFilters;
