import React from 'react';
import Label from '../Label';
import Checkbox from '../Checkbox';
import styles from './CheckList.module.scss';

type Props = {
  name: string;
  onChange: (values: string[]) => void;
  items: string[];
  selected: string[];
  label?: string;
};

const CheckList = ({ items, selected, onChange, label }: Props) => {
  const handleChange = (item: string) => () => {
    if (selected.includes(item)) {
      selected.splice(selected.indexOf(item), 1);
      onChange([...selected]);
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className={styles.container}>
      {label && <div className={styles.header}>{label}</div>}
      {items.map((item, index) => {
        return (
          <Label key={`${item}-${index}`}>
            <Checkbox value={item} onChange={handleChange(item)} checked={selected.includes(item)} />
            <div>{item}</div>
          </Label>
        );
      })}
    </div>
  );
};

export default CheckList;
