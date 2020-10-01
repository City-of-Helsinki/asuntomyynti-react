import React, { useState } from 'react';
import { SearchItem } from '../../hooks/useConfig';
import Label from '../Label';

type Props = React.HTMLProps<HTMLInputElement> & SearchItem;

const InputField = ({ label, onChange, ...rest }: Props) => {
  const [value, setValue] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // Call the original onChange method
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Label>
      {label}
      <input value={value} onChange={handleOnChange} {...rest} />
    </Label>
  );
};

export default InputField;
