import React, { useContext, useState } from 'react';
import styles from './SearchForm.module.scss';
import { Button, IconSearch } from 'hds-react';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';
import Collapsible from '../../../../common/collapsible/Collapsible';
import { FilterName, FilterConfigs } from '../../../../types/common';
import TagList from './tag/TagList';
import { useTranslation } from 'react-i18next';
import useFilters from '../../../../hooks/useFilters';
import { FilterContext } from '../../FilterContext';

type Props = {
  onSubmit: () => void;
};

const SearchForm = ({ onSubmit }: Props) => {
  const { clearAllFilters, hasFilters } = useFilters();
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const { t } = useTranslation();
  const { data: config, isLoading, isError } = useContext(FilterContext) || {};

  const { project_district, room_count, living_area, sales_price, ...additionalFilters } = config || {};

  // TODO: Add a notification to indicate something went wrong
  if (!isLoading && isError) {
    return null;
  }

  return (
    <div className={`${styles.container} ${isOptionsOpen ? styles.expand : ''} ${isLoading ? styles.isLoading : ''}`}>
      <div className={styles.form}>
        <h1>Etsi Hitas-omistusasuntoja</h1>
        <div className={styles.row}>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {project_district && <Dropdown name={FilterName.ProjectDistrict} {...project_district} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {room_count && <Dropdown name={FilterName.RoomCount} {...room_count} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {living_area && <Dropdown name={FilterName.LivingArea} {...living_area} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {sales_price && <Dropdown name={FilterName.SalesPrice} {...sales_price} />}
          </div>
          <div className={`${styles.column} ${styles.canShimmer}`}>
            {!isLoading && (
              <Button onClick={() => onSubmit()} iconLeft={<IconSearch aria-hidden="true" />}>
                {t('SEARCH:search')}
              </Button>
            )}
          </div>
        </div>
        <Collapsible
          expand={isOptionsOpen}
          onCollapse={() => {
            setOptionsVisible(false);
          }}
        >
          <div className={styles.row}>
            <div className={styles.divider} />
          </div>
          <div className={styles.row}>
            {isOptionsVisible &&
              (Object.keys(additionalFilters) as FilterName[]).map<JSX.Element>((name, index) => (
                <div className={styles.column} key={index}>
                  {(additionalFilters as FilterConfigs)[name] && (
                    <QueryFilter name={name} {...(additionalFilters as FilterConfigs)[name]} />
                  )}
                </div>
              ))}
          </div>
        </Collapsible>
        <div className={styles.row}>
          <div className={styles.column}>{config && <TagList config={config} />}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.divider} />
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <button
              className={styles.showMoreButton}
              onClick={() => {
                if (isOptionsOpen) {
                  setOptionsOpen(false);
                } else {
                  setOptionsOpen(true);
                  setOptionsVisible(true);
                }
              }}
            >
              <span>{isOptionsOpen ? t('SEARCH:show-less-options') : t('SEARCH:show-more-options')}</span>
            </button>
          </div>
          {config && hasFilters(config) && (
            <div className={styles.column}>
              <button onClick={() => clearAllFilters(config)} className={styles.clearFilters}>
                {t('SEARCH:clear-all-filters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
