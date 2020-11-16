import { BaseFilterConfigs, FilterConfigs, FilterName, PartialConfig } from '../types/common';
import filterMap from '../modules/search/utils/filterMap';
import { defaultConfig } from '../modules/search/utils/defaultConfig';

export const enhanceConfig = (config: BaseFilterConfigs) =>
  (Object.keys(filterMap) as FilterName[]).reduce((accumulator, filterName) => {
    const filterConfig = {
      ...accumulator[filterName],
      ...defaultConfig(filterName),
      ...((config[filterName] || {}) as PartialConfig | {}),
    };
    return {
      ...accumulator,
      [filterName]: {
        ...filterMap[filterName](filterConfig),
      },
    };
  }, {} as FilterConfigs);
