import styles from './Checkbox.module.scss';
import React, { FunctionComponent, HTMLProps } from 'react';

type Props = {
  checked: boolean;
};

const Checkbox: FunctionComponent<HTMLProps<Props & HTMLInputElement>> = ({ ...rest }) => {
  // TODO: Make this accessible
  return <input type="checkbox" className={`${styles.checkbox}`} {...rest} />;
};

export default Checkbox;
