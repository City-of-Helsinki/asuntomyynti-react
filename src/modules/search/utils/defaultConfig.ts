import { PartialConfig } from '../../../types/common';

export const defaultConfig = (name: string): PartialConfig => ({
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
  getTagLabel: (value: string) =>
    value
      .split(',')
      .filter((value) => value !== '') // Filter out empty values
      .map((value) => ({ name, value })),
});
