import { BaseFilterConfigs, FilterConfigs, FilterName, PartialFilterConfig } from '../types/common';
import filterMap from '../modules/search/utils/filterMap';
import { defaultConfig } from '../modules/search/utils/defaultConfig';

export const enhanceFilterConfig = (config: BaseFilterConfigs) =>
  (Object.keys(filterMap) as FilterName[]).reduce((accumulator, filterName) => {
    const filterConfig = {
      ...accumulator[filterName],
      ...defaultConfig(filterName),
      ...((config[filterName] || {}) as PartialFilterConfig | {}),
    };
    return {
      ...accumulator,
      [filterName]: {
        ...filterMap[filterName](filterConfig),
      },
    };
  }, {} as FilterConfigs);
