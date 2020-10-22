import { BaseFilterConfigs, FilterConfigs, FilterName, PartialConfig } from '../types/common';
import filterMap from '../modules/search/utils/filterMap';
import { defaultConfig } from '../modules/search/utils/defaultConfig';

export const enhanceConfig = (config: BaseFilterConfigs): FilterConfigs =>
  Object.keys(filterMap).reduce<FilterConfigs>((accumulator, key) => {
    const filterConfig = {
      ...accumulator[key as FilterName],
      ...defaultConfig(key as FilterName),
      ...((config[key as FilterName] || {}) as PartialConfig | {}),
    };
    return {
      ...accumulator,
      [key]: {
        ...filterMap[key as FilterName](filterConfig),
      },
    };
  }, {} as FilterConfigs);
