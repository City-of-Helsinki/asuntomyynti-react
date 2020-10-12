// TODO: look into react-query for caching and such
import { RawFilterConfig } from '../types/common';
import mockSearchConfig from '../modules/search/form/filter/mocks/filter-config.json';

export const fetchFilterConfig = (): Promise<RawFilterConfig> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSearchConfig as RawFilterConfig);
    }, 1000);
  });
