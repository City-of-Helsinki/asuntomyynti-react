import React from 'react';
import InputField from '../InputField';
import { FilterItem } from '../../hooks/useFilter';

type Props = {
  from: FilterItem;
  to: FilterItem;
  onChange: (values: string[]) => void;
  values: string[];
};

const RangeField = ({ values, from, to, onChange }: Props) => {
  const handleOnChange = (index: number) => (value: string) => {
    values.splice(index, 1, value);
    onChange(values);
  };

  let [min = '', max = ''] = values;

  return (
    <div>
      <InputField {...from} value={min} onChange={handleOnChange(0)} />
      <InputField {...to} value={max} onChange={handleOnChange(1)} />
    </div>
  );
};

export default RangeField;
