import { FilterMap, FilterType, QueryParams } from '../../../types/common';

const fiveOrMoreItem = '5+ h';

const termsQuery = (key: string, onlyNumbers = false) => (values: string[]) => [
  {
    terms: {
      [key]: onlyNumbers ? values.map((x) => parseInt(x)) : values,
    },
  },
];

const filterMap: { [key: string]: FilterMap } = {
  project_district: {
    type: FilterType.MultiSelect,
    icon: 'location',
    getQuery: termsQuery('project_district'),
  },
  room_count: {
    type: FilterType.MultiSelect,
    icon: 'home',
    getQuery: (values) => {
      const filters: QueryParams[] = termsQuery('room_count', true)(values);
      const includeFiveOrMore = values.indexOf(fiveOrMoreItem) !== -1;
      if (includeFiveOrMore) {
        filters.push({
          range: {
            room_count: {
              gte: 4,
            },
          },
        });
      }
      return filters;
    },
  },
  living_area: {
    type: FilterType.Range,
    getQuery: (values) => {
      const [gte, lte] = values.map((x) => parseInt(x));
      return [
        {
          range: {
            living_area: {
              // Add key and value only if has value
              ...(gte ? { gte } : {}),
              ...(lte ? { lte } : {}),
            },
          },
        },
      ];
    },
    items: [
      {
        label: 'Vähintään',
        placeholder: 'm2',
      },
      {
        label: 'Enintään',
        placeholder: 'm2',
      },
    ],
    label: 'Pinta-ala, m2',
  },
  sales_price: {
    type: FilterType.Input,
    getQuery: ([value]) => [
      {
        range: {
          sales_price: {
            lte: parseInt(value),
          },
        },
      },
    ],
    items: [
      {
        label: 'Hinta korkeintaan',
        placeholder: '€',
        helperText: 'tuhatta euroa',
      },
    ],
    label: 'Hinta',
  },
  project_building_type: {
    type: FilterType.MultiSelect,
    getQuery: termsQuery('project_building_type'),
  },
  properties: {
    type: FilterType.MultiSelect,
    getQuery: (values: string[]) => values.map((value) => ({ term: { [value]: true } })),
  },
  state_of_sale: {
    type: FilterType.MultiSelect,
    getQuery: termsQuery('state_of_sale'),
  },
};

export default filterMap;
