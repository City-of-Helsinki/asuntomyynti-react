import React from 'react';
import styles from './CheckList.module.scss';
import { Checkbox } from 'hds-react';
import useSearchParams from '../../../../hooks/useSearchParams';

type Props = {
  name: string;
  items: string[];
  label?: string;
  isWrapped?: boolean;
};

const CheckList = ({ name, items, label, isWrapped }: Props) => {
  const { addValue, removeValue, getValues } = useSearchParams();

  const selected = getValues(name);

  const handleChange = (item: string) => () => {
    if (selected.includes(item)) {
      removeValue(name, item);
    } else {
      addValue(name, item);
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
