// TODO: look into react-query for caching and such
import { BaseFilterConfigs } from '../types/common';
import mockSearchConfig from '../modules/search/mocks/filter-config.json';

export const fetchFilterConfig = (): Promise<BaseFilterConfigs> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSearchConfig as BaseFilterConfigs);
    }, 1000);
  });
