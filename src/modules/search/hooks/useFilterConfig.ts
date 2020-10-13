import { useEffect, useState } from 'react';
import { BaseFilterConfigs, FilterConfigs } from '../../../types/common';
import filterMap from '../utils/filterMap';
import { fetchFilterConfig } from '../../../utils/fetchFilterConfig';
import { defaultConfig } from '../utils/defaultConfig';

const enhanceConfig = (config: BaseFilterConfigs): FilterConfigs => {
  return Object.keys(filterMap).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: {
        ...defaultConfig(key),
        ...config[key],
        ...filterMap[key],
      },
    };
  }, {});
};

const useFilterConfig = () => {
  const [config, setConfig] = useState<FilterConfigs>(enhanceConfig({}));

  useEffect(() => {
    const updateFilterConfig = async () => {
      const config = await fetchFilterConfig();
      setConfig(enhanceConfig(config));
    };
    updateFilterConfig();
  }, []);

  return config;
};

export default useFilterConfig;
