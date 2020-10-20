import React, { useState } from 'react';
import styles from './SearchForm.module.scss';
import { Button } from 'hds-react';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';
import Collapsible from '../../../../common/collapsible/Collapsible';
import { FilterConfigs, FilterName } from '../../../../types/common';
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
    project_new_development_status,
  } = config;

  return (
    <div className={`${styles.container} ${showMoreOptions ? styles.expand : ''}`}>
      <div className={styles.form}>
        <h1>Etsi Hitas-omistusasuntoja</h1>
        <div className={styles.row}>
          <div className={styles.column}>
            <Dropdown name={FilterName.ProjectDistrict} {...project_district} />
          </div>
          <div className={styles.column}>
            <Dropdown name={FilterName.RoomCount} {...room_count} />
          </div>
          <div className={styles.column}>
            <Dropdown name={FilterName.LivingArea} {...living_area} />
          </div>
          <div className={styles.column}>
            <Dropdown name={FilterName.SalesPrice} {...sales_price} />
          </div>
          <div className={styles.column}>
            <Button onClick={() => onSubmit()}>Submit</Button>
          </div>
        </div>
        <Collapsible expand={showMoreOptions}>
          <div className={styles.row}>
            <div className={styles.divider} />
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <QueryFilter name={FilterName.ProjectBuildingType} {...project_building_type} />
            </div>
            <div className={styles.column}>
              <QueryFilter name={FilterName.Properties} {...properties} />
            </div>
            <div className={styles.column}>
              <QueryFilter name={FilterName.ProjectNewDevelopmentStatus} {...project_new_development_status} />
            </div>
          </div>
        </Collapsible>
        <div className={styles.row}>
          <TagList config={config} />
        </div>
        <div className={styles.row}>
          <div className={styles.divider} />
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <button
              className={styles.showMoreButton}
              onClick={() => {
                setShowMoreOptions(!showMoreOptions);
              }}
            >
              <span>{showMoreOptions ? 'Näytä vähemmän valintoja' : 'Näytä enemmän valintoja'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
