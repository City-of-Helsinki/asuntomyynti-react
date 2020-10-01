import styles from '../SearchForm/SearchForm.module.scss';
import QueryList from '../QueryList';
import React from 'react';
import useConfig from '../../hooks/useConfig';

type Props = {
  name: string;
};

const CheckList = ({ name }: Props) => {
  const { items, label } = useConfig(name);
  return (
    <div>
      <div className={styles.header}>{label}</div>
      <QueryList name={name} items={items} />
    </div>
  );
};

export default CheckList;
