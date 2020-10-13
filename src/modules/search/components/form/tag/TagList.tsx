import React from 'react';
import { IconCross } from 'hds-react';
import styles from './TagList.module.scss';
import useFilters from '../../../../../hooks/useFilters';

const TagList = () => {
  const { getAllFilters, removeFilter } = useFilters();

  const params = getAllFilters();

  const handleClick = (name: string, value: string) => () => removeFilter(name, value);

  return (
    <div className={styles.container}>
      {params.map(({ name, value }, index) => (
        <button key={index} className={styles.tag} onClick={handleClick(name, value)}>
          <IconCross className={styles.icon} />
          <span className={styles.label}>{value}</span>
        </button>
      ))}
    </div>
  );
};

export default TagList;
