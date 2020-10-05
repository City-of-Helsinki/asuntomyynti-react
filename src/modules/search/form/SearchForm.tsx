import React from 'react';
import styles from './SearchForm.module.scss';
import { Button } from 'hds-react';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';

const SearchForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Etsi Hitas-omistusasuntoja</h1>
        <div className={styles.row}>
          <div className={styles.column}>
            <Dropdown name="param1" />
          </div>
          <div className={styles.column}>
            <Dropdown name="param2" />
          </div>
          <div className={styles.column}>
            <Dropdown name="param3" />
          </div>
          <div className={styles.column}>
            <Dropdown name="param4" />
          </div>
          <div className={styles.column}>
            <Button>Submit</Button>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <div className={styles.column}>
            <QueryFilter name="housing_type" />
          </div>
          <div className={styles.column}>
            <QueryFilter name="apartment_properties" />
          </div>
          <div className={styles.column}>
            <QueryFilter name="state_of_sale" />
          </div>
        </div>
        <div className={styles.divider} />
      </div>
    </div>
  );
};

export default SearchForm;
