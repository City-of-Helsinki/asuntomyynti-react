import { BaseFilterConfigs, DefaultFilterConfig, FilterConfigs, FilterName, PartialConfig } from '../types/common';
import filterMap from '../modules/search/utils/filterMap';
import { defaultConfig } from '../modules/search/utils/defaultConfig';

export const enhanceConfig = (config: BaseFilterConfigs) =>
  Object.keys(filterMap).reduce<BaseFilterConfigs>((accumulator, key) => {
    const filterConfig = {
      ...(accumulator[key as FilterName] as DefaultFilterConfig),
      ...((config[key as FilterName] || {}) as PartialConfig | {}),
    };
    return {
      ...accumulator,
      [key]: {
        ...filterMap[key as FilterName](filterConfig),
      },
    };
  }, defaultConfig) as FilterConfigs;
