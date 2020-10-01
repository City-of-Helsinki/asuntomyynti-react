import { useEffect, useState } from 'react';
import mockSearchConfig from './mocks/search-config.json';

export type SearchItem = {
  label: string;
  placeholder?: string;
  max?: number;
  min?: number;
  info?: string;
};

export type SearchConfig = {
  items: (string | SearchItem)[];
  label: string;
  icon?: string;
};

const defaultConfig = {
  items: [],
  label: '',
  range: null,
  max: null,
};

const fetchMockConfig = (name: string): Promise<SearchConfig> =>
  new Promise((resolve) => {
    console.log('fetching config mocks...');
    setTimeout(() => {
      console.log('done');
      resolve({
        ...defaultConfig,
        ...(mockSearchConfig as { [key: string]: SearchConfig })[name], // HAXOR for the mock
      });
    }, 1000);
  });

const useConfig = (name: string) => {
  const [config, setConfig] = useState<SearchConfig>(defaultConfig);

  useEffect(() => {
    // TODO: Consider using react-query for caching the request
    fetchMockConfig(name).then((config) => setConfig(config));
  }, [name]);

  return config;
};

export default useConfig;
