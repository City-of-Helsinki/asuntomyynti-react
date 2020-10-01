import styles from './Label.module.scss';
import React, { FunctionComponent, HTMLProps } from 'react';

const Label: FunctionComponent<HTMLProps<HTMLLabelElement>> = ({ children, ...rest }) => {
  return (
    <label className={styles.label} {...rest}>
      {children}
    </label>
  );
};

export default Label;
