import { DefaultFilterConfig, FilterName } from '../../../types/common';

export const defaultConfig = (name: FilterName): DefaultFilterConfig => ({
  label: name,
  suffix: null,
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
