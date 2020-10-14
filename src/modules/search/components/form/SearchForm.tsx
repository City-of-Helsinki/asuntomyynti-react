import React, { useState } from 'react';
import styles from './SearchForm.module.scss';
import { Button } from 'hds-react';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';
import Collapsible from '../../../../common/collapsible/Collapsible';
import { FilterConfigs } from '../../../../types/common';
import TagList from './tag/TagList';

type Props = {
  onSubmit: () => void;
  config: FilterConfigs;
};

const SearchForm = ({ config, onSubmit }: Props) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

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
    <div className={`${styles.container} ${showMoreOptions ? styles.expand : ''}`}>
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
        <Collapsible expand={showMoreOptions}>
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
          <TagList config={config} />
        <div className={styles.divider} />
        </Collapsible>
        <button
          className={styles.showMoreButton}
          onClick={() => {
            setShowMoreOptions(!showMoreOptions);
          }}
        >
          <span>{setShowMoreOptions ? 'Näytä vähemmän valintoja' : 'Näytä enemmän valintoja'}</span>
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
