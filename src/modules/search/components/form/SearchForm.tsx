import React from 'react';
import styles from './SearchForm.module.scss';
import { Button } from 'hds-react';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';
import { FilterConfig } from '../../../../types/common';
import TagList from './tag/TagList';

type Props = {
  onSubmit: () => void;
  config: FilterConfig;
};

const SearchForm = ({ config, onSubmit }: Props) => {
  const {
    project_district,
    room_count,
    living_area,
    sales_price,
    project_building_type,
    properties,
    state_of_sale,
  } = config;
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Etsi Hitas-omistusasuntoja</h1>
        <div className={styles.row}>
          <div className={styles.column}>
            <Dropdown name="project_district" {...project_district} />
          </div>
          <div className={styles.column}>
            <Dropdown name="room_count" {...room_count} />
          </div>
          <div className={styles.column}>
            <Dropdown name="living_area" {...living_area} />
          </div>
          <div className={styles.column}>
            <Dropdown name="sales_price" {...sales_price} />
          </div>
          <div className={styles.column}>
            <Button onClick={() => onSubmit()}>Submit</Button>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <div className={styles.column}>
            <QueryFilter name="project_building_type" {...project_building_type} />
          </div>
          <div className={styles.column}>
            <QueryFilter name="properties" {...properties} />
          </div>
          <div className={styles.column}>
            <QueryFilter name="state_of_sale" {...state_of_sale} />
          </div>
        </div>
        <div className={styles.divider} />
      </div>
      <TagList />
    </div>
  );
};

export default SearchForm;
