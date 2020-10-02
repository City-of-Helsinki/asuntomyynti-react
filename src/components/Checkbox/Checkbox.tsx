import styles from './Checkbox.module.scss';
import React, { HTMLProps } from 'react';

const Checkbox = ({ ...rest }: HTMLProps<HTMLInputElement>) => {
  // TODO: Make this accessible
  return <input type="checkbox" className={`${styles.checkbox}`} {...rest} />;
};

export default Checkbox;
