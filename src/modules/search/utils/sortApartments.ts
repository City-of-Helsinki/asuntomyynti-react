import React from 'react';
import useSessionStorageState from '../../../hooks/useSessionStorageState';

const SortApartments = (items: any, sessionStorageID: string) => {
  const sortDefaultProps = {
    key: 'apartment_number',
    direction: 'ascending',
    alphaNumeric: true,
  };
  const [sortConfig, setSortConfig] = useSessionStorageState({
    defaultValue: sortDefaultProps,
    key: `sortConfig-${sessionStorageID}`,
  });

  const sortedApartments = React.useMemo(() => {
    let sortableApartments = [...items];

    if (sortConfig !== null) {
      if (sortConfig.alphaNumeric) {
        sortableApartments.sort((a, b) => {
          const firstValue = a[sortConfig.key].split(' ').join('');
          const secondValue = b[sortConfig.key].split(' ').join('');
          if (sortConfig.direction === 'ascending') {
            return firstValue.localeCompare(secondValue, 'fi', { numeric: true });
          }
          return secondValue.localeCompare(firstValue, 'fi', { numeric: true });
        });
      } else {
        sortableApartments.sort((a, b) => {
          const firstValue = a[sortConfig.key];
          const secondValue = b[sortConfig.key];

          if (firstValue < secondValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (firstValue > secondValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
    }
    return sortableApartments;
  }, [items, sortConfig]);

  const requestSort = (key: string, alphaNumeric: boolean) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction, alphaNumeric });
  };

  return { items: sortedApartments, requestSort, sortConfig };
};

export default SortApartments;
