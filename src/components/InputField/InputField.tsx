import React from 'react';
import { FilterItem } from '../../hooks/useFilter';
import Label from '../Label';
import styles from './InputField.module.scss';

type Props = {
  onChange: (value: string) => void;
  value?: string;
} & FilterItem;

const InputField = ({ label, onChange, value, ...rest }: Props) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Call only with value
      onChange(event.target.value);
    }
  };

  return (
    <Label className={styles.container}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} onChange={handleOnChange} value={value} {...rest} />
    </Label>
  );
};

export default InputField;
