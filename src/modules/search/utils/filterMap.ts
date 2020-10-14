import { PartialConfig, FilterType, QueryParams } from '../../../types/common';
import { formatRange } from './formatRange';
import { groupNumbers, listGroupedNumbers } from '../../../utils/groupNumbers';

const fiveOrMoreRooms = '5+ h';

const filterMap: { [key: string]: PartialConfig } = {
  project_district: {
    type: FilterType.MultiSelect,
    icon: 'location',
    getLabel: (values) => {
      const [firstItem] = values;
      if (!firstItem) {
        return '';
      }
      return firstItem + (values.length > 1 ? ` +${values.length - 1}` : '');
    },
  },

  room_count: {
    type: FilterType.MultiSelect,
    icon: 'home',
    getQuery: (values) => {
      const filters: QueryParams[] = [
        {
          terms: {
            room_count: values.map((x) => parseInt(x)),
          },
        },
      ];
      if (values.includes(fiveOrMoreRooms)) {
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
    getLabel: (values) => {
      const groupedNumbers = groupNumbers(values.map((x) => parseInt(x)));
      return listGroupedNumbers(groupedNumbers, (first, last) => (last === 5 ? `h, 5+` : `h`));
    },
  },

  living_area: {
    type: FilterType.Range,
    items: [
      {
        label: 'Vähintään',
        placeholder: 'm²',
      },
      {
        label: 'Enintään',
        placeholder: 'm²',
      },
    ],
    label: 'Pinta-ala, m²',
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
    getLabel: (values) => {
      return formatRange(values);
    },
    getTagLabel: (value) => {
      const formattedRange = formatRange(value.split(','));
      return [{ name: 'living_area', value: formattedRange }];
    },
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
    getLabel: ([value]) => {
      return `${value} 000 m²`;
    },
  },

  project_building_type: {
    type: FilterType.MultiSelect,
  },

  properties: {
    type: FilterType.MultiSelect,
    getQuery: (values: string[]) => values.map((value) => ({ term: { [value]: true } })),
  },

  state_of_sale: {
    type: FilterType.MultiSelect,
  },
};

export default filterMap;
