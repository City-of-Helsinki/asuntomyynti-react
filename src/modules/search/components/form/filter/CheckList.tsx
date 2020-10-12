import React from 'react';
import styles from './CheckList.module.scss';
import { Checkbox } from 'hds-react';

type Props = {
  name: string;
  onChange: (values: string[]) => void;
  items: string[];
  selected: string[];
  label?: string;
  isWrapped?: boolean;
};

const CheckList = ({ items, selected, onChange, label, isWrapped }: Props) => {
  const handleChange = (item: string) => () => {
    if (selected.includes(item)) {
      const filteredSelection = selected.filter((x) => x !== item);
      onChange(filteredSelection);
    } else {
      onChange([...selected, item]);
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
