import React from 'react';
import { IconCross } from 'hds-react';
import styles from './TagList.module.scss';
import useFilters from '../../../../../hooks/useFilters';
import { FilterConfigs, FilterName, FilterType, ParamList } from '../../../../../types/common';

type Props = {
  config: FilterConfigs;
};

const TagList = ({ config }: Props) => {
  const { clearFilter, removeFilter, getAllFilters } = useFilters();

  const params = getAllFilters().reduce((all: ParamList, [name, value]) => {
    const { unserialize } = config[name] || {};
    if (unserialize) {
      return [...all, ...unserialize(value)];
    }
    return all;
  }, []);

  const handleClick = (name: FilterName, value: string) => () =>
    config[name].type === FilterType.Range ? clearFilter(name) : removeFilter(name, value);

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
