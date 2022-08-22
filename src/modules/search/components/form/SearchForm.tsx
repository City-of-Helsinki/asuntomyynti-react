import React, { RefObject } from 'react';
import styles from './SearchForm.module.scss';
import { Button, IconSearch, IconCross, Notification } from 'hds-react';
import cx from 'classnames';
import Dropdown from './filter/Dropdown';
import { DataConfig, FilterName } from '../../../../types/common';
import TagList from './tag/TagList';
import { useTranslation } from 'react-i18next';
import useFilters from '../../../../hooks/useFilters';

type Props = {
  config: DataConfig | undefined;
  isLoading: boolean | undefined;
  isError: boolean | undefined;
  pageTitle: string;
  projectOwnershipType: string;
  focusRef: RefObject<HTMLDivElement>;
  onSubmit: () => void;
};

const SearchForm = ({ config, isLoading, isError, pageTitle, projectOwnershipType, focusRef, onSubmit }: Props) => {
  const { clearAllFilters, hasFilters } = useFilters();
  const { t } = useTranslation();
  const { filters } = config || {};
  const { project_district_hitas, project_district_haso, room_count, living_area, price } = filters || {};

  const searchButton = () => (
    <Button className={styles.submitButton} onClick={() => onSubmit()} iconLeft={<IconSearch aria-hidden="true" />}>
      {t('SEARCH:search')}
    </Button>
  );

  if (!isLoading && isError) {
    return (
      <section className={styles.container} aria-label={t('SEARCH:aria-filters-title')}>
        <div className={styles.form}>
          <h1>{pageTitle}</h1>
          <Notification label={t('SEARCH:error')} type="error">
            {t('SEARCH:filters-error-text')}
          </Notification>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${styles.container} ${isLoading ? styles.isLoading : ''}`}
      aria-label={t('SEARCH:aria-filters-title')}
    >
      <div className={styles.form}>
        <h1>{pageTitle}</h1>
        <div className={cx(styles.row, styles.hasBottomPadding)}>
          <div className={cx(styles.column, styles.columnWide, styles.dropdownColumn, styles.canShimmer)}>
            <div className={styles.dropdownWrapper}>
              {projectOwnershipType.toLowerCase() === 'haso'
                ? project_district_haso && <Dropdown name={FilterName.ProjectDistrict} {...project_district_haso} />
                : project_district_hitas && <Dropdown name={FilterName.ProjectDistrict} {...project_district_hitas} />}
            </div>
          </div>
          <div className={cx(styles.column, styles.columnWide, styles.dropdownColumn, styles.canShimmer)}>
            <div className={styles.dropdownWrapper}>
              {room_count && <Dropdown name={FilterName.RoomCount} {...room_count} />}
            </div>
          </div>
          <div className={cx(styles.column, styles.columnNarrow, styles.dropdownColumn, styles.canShimmer)}>
            <div className={styles.dropdownWrapper}>
              {living_area && <Dropdown name={FilterName.LivingArea} {...living_area} />}
            </div>
          </div>
          <div className={cx(styles.column, styles.columnNarrow, styles.dropdownColumn, styles.canShimmer)}>
            <div className={styles.dropdownWrapper}>{price && <Dropdown name={FilterName.Price} {...price} />}</div>
          </div>
          <div className={cx(styles.column, styles.columnNarrow, styles.canShimmer, styles.searchButtonDesktop)}>
            {!isLoading && searchButton()}
          </div>
          <div className="sr-only">
            <button type="button" onClick={() => focusRef.current?.focus()}>
              {t('SEARCH:aria-jump-to-results')}
            </button>
          </div>
        </div>
        {filters && (
          <div className={styles.row}>
            <div className={styles.column} role="region" aria-label={t('SEARCH:aria-active-filters')}>
              <TagList filters={filters} />
            </div>
          </div>
        )}
        <div className={styles.searchButtonMobile}>{!isLoading && searchButton()}</div>
        <div className={cx(styles.row, styles.hasTopPadding)}>
          {filters && hasFilters(filters) && (
            <div className={cx(styles.column, styles.textCenterMobile)}>
              <button onClick={() => clearAllFilters(filters)} className={styles.clearFilters}>
                <IconCross aria-hidden="true" />
                <span>{t('SEARCH:clear-all-filters')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {!isLoading && (
        <div className="sr-only">
          <button type="button" onClick={() => onSubmit()}>
            {t('SEARCH:search')}
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchForm;
