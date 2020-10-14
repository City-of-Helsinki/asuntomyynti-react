import React from 'react';
import styles from './CheckList.module.scss';
import { Checkbox } from 'hds-react';
import useFilters from '../../../../../hooks/useFilters';

type Props = {
  name: string;
  items: string[];
  label?: string;
  isWrapped?: boolean;
};

const CheckList = ({ name, items, label, isWrapped }: Props) => {
  const { addFilter, removeFilter, getFilters } = useFilters();

  const selected = getFilters(name);

  const handleChange = (item: string) => () => {
    if (selected.includes(item)) {
      removeFilter(name, item);
    } else {
      addFilter(name, item);
    }
  };

  return (
    <div className={isWrapped ? styles.isWrapped : ''}>
      {!isWrapped && label && <div className={styles.header}>{label}</div>}
      {items.map((item, index) => {
        return (
          <div key={`${item}-${index}`} className={styles.item}>
            <Checkbox
              id={`${label}-${item}-${index}`}
              onChange={handleChange(item)}
              label={item}
              checked={selected.includes(item)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CheckList;
