import { DefaultFilterConfig, FilterConfig, FilterName, FilterType, QueryParams } from '../../../types/common';
import { formatRange } from './formatRange';
import { groupConsecutiveNumbers, listGroupedNumbers } from '../../../utils/groupConsecutiveNumbers';

const fiveOrMoreRooms = '5+';

type FilterMap = {
  [key in FilterName]: (config: DefaultFilterConfig) => FilterConfig;
};

const filterMap: FilterMap = {
  project_district: (config) => ({
    ...config,
    type: FilterType.MultiSelect,
    icon: 'location',
    getLabel: (values: string[]) => {
      const [firstItem] = values;
      if (!firstItem) {
        return '';
      }
      return firstItem + (values.length > 1 ? ` +${values.length - 1}` : '');
    },
  }),

  room_count: ({ suffix = '', items, ...rest }) => ({
    ...rest,
    items: items.map((item) => `${item}${suffix}`),
    type: FilterType.MultiSelect,
    icon: 'home',
    getQuery: (values) => {
      const filters: QueryParams[] = [
        {
          terms: {
            [FilterName.RoomCount]: values.map((x) => parseInt(x)),
          },
        },
      ];
      if (values.includes(fiveOrMoreRooms)) {
        filters.push({
          range: {
            [FilterName.RoomCount]: {
              gte: 4,
            },
          },
        });
      }
      return filters;
    },
    getLabel: (values) => {
      const groupedNumbers = groupConsecutiveNumbers(values.map((x) => parseInt(x)));
      return listGroupedNumbers(groupedNumbers, (first, last) =>
        last === 5 ? `${suffix}, 5+${suffix}` : suffix || ''
      );
    },
  }),

  living_area: ({ items: [from, to], suffix, ...rest }) => ({
    ...rest,
    type: FilterType.Range,
    items: [
      { label: from || '', placeholder: suffix || '' },
      { label: to || '', placeholder: suffix || '' },
    ],
    getQuery: (values) => {
      const [gte, lte] = values.map((x) => parseInt(x));
      return [
        {
          range: {
            [FilterName.LivingArea]: {
              // Add key and value only if has value
              ...(gte ? { gte } : {}),
              ...(lte ? { lte } : {}),
            },
          },
        },
      ];
    },
    getLabel: (values) => {
      return formatRange(values);
    },
    getTagLabel: (serializedValue) => {
      const formattedRange = formatRange(serializedValue.split(','));
      return [[FilterName.LivingArea, formattedRange]];
    },
  }),

  sales_price: ({ items: [label], suffix, ...rest }) => ({
    ...rest,
    type: FilterType.Input,
    items: [
      {
        label,
        placeholder: suffix || '',
      },
    ],
    getQuery: ([value]) => [
      {
        range: {
          [FilterName.SalesPrice]: {
            lte: parseInt(value) * 1000,
          },
        },
      },
    ],
    getLabel: ([value]) => {
      return `${value} 000 ${suffix}`;
    },
    getTagLabel: (value) => [[FilterName.SalesPrice, value, `${value} 000 m²`]],
  }),

  project_building_type: (config) => ({
    ...config,
    type: FilterType.MultiSelect,
  }),

  properties: (config) => ({
    ...config,
    type: FilterType.MultiSelect,
    getQuery: (values: string[]) => values.map((value) => ({ term: { [value]: true } })),
  }),

  project_new_development_status: (config) => ({
    ...config,
    type: FilterType.MultiSelect,
  }),

  state_of_sale: (config) => ({
    ...config,
    type: FilterType.MultiSelect,
  }),
};

export default filterMap;
