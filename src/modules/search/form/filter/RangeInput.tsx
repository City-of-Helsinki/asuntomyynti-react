import React from 'react';
import { TextInput } from 'hds-react';
import styles from './RangeInput.module.scss';
import { FilterItem } from '../../../../types/common';

type Props = {
  from: FilterItem;
  to: FilterItem;
  onChange: (values: string[]) => void;
  values: string[];
};

const RangeInput = ({ values, from, to, onChange }: Props) => {
  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value || '';
    const newRange = values.map((item, i) => (i === index ? newValue : item));
    onChange(newRange);
  };

  let [min = '', max = ''] = values;

  return (
    <div className={styles.container}>
      <TextInput {...from} id={from.label} value={min} onChange={onChange && handleChange(0)} />
      <TextInput {...to} id={to.label} value={max} onChange={onChange && handleChange(1)} />
    </div>
  );
};

export default RangeInput;
