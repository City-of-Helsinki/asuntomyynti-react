import React from 'react';
import { TextInput } from 'hds-react';
import styles from './RangeInput.module.scss';
import { FilterItem } from '../../../../../types/common';
import useSearchParams from '../../../../../hooks/useSearchParams';

type Props = {
  name: string;
  from: FilterItem;
  to: FilterItem;
};

const RangeInput = ({ name, from, to }: Props) => {
  const { getValues, setValues } = useSearchParams();

  const [min = '', max = ''] = getValues(name);
  const values = [min, max];

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value || '';
    const newRange = values.map((item: string, i: number) => (i === index ? newValue : item));
    setValues(name, newRange);
  };

  return (
    <div className={styles.container}>
      <TextInput {...from} id={from.label} value={min} onChange={handleChange(0)} />
      <TextInput {...to} id={to.label} value={max} onChange={handleChange(1)} />
    </div>
  );
};

export default RangeInput;
