import { useEffect, useState } from 'react';
import mockSearchConfig from './mocks/filter-config.json';

export type FilterItem = {
  label: string;
  placeholder?: string;
  max?: number;
  min?: number;
  info?: string;
};

export enum FilterType {
  MultiSelect = 'multiselect',
  Input = 'input',
  Range = 'range',
}

export type FilterConfig = {
  items: (string | FilterItem)[];
  type?: FilterType;
  label: string;
  icon?: string;
};

const defaultConfig: FilterConfig = {
  items: [],
  label: '',
};

const fetchMockConfig = (name: string): Promise<FilterConfig> =>
  new Promise((resolve) => {
    console.log('fetching config mocks...');
    setTimeout(() => {
      console.log('done');
      resolve({
        ...defaultConfig,
        ...(mockSearchConfig as { [key: string]: FilterConfig })[name], // HAXOR for the mock
      });
    }, 1000);
  });

const useFilter = (name: string) => {
  const [config, setConfig] = useState<FilterConfig>(defaultConfig);

  useEffect(() => {
    // TODO: Consider using react-query for caching the request
    fetchMockConfig(name).then((config) => setConfig(config));
  }, [name]);

  return config;
};

export default useFilter;
