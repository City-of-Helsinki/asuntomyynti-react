import { DefaultFilterConfig, DefaultFilterConfigs, FilterName } from '../../../types/common';

const getDefaultConfig = (name: FilterName): DefaultFilterConfig => ({
  label: '',
  items: [],
  getQuery: (values: string[]) => [
    {
      terms: {
        [name]: values,
      },
    },
  ],
  getLabel: (values: string[]) => {
    return values.join(', ');
  },
  getTagLabel: (serializedValue: string) =>
    serializedValue
      .split(',')
      .filter((value) => value !== '') // Filter out empty values
      .map((value) => [name, value]),
});

export const defaultConfig = Object.values(FilterName).reduce(
  (config, name) => ({ ...config, [name]: getDefaultConfig(name) }),
  {} as DefaultFilterConfigs
);
