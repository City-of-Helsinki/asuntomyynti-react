import React, { RefObject, useRef, useEffect } from 'react';
import styles from './SearchForm.module.scss';
import { Button, IconSearch, IconMinus, IconPlus, IconCross, Notification } from 'hds-react';
import cx from 'classnames';
import QueryFilter from './filter/QueryFilter';
import Dropdown from './filter/Dropdown';
import Collapsible from '../../../../common/collapsible/Collapsible';
import { DataConfig, FilterName, FilterConfigs } from '../../../../types/common';
import TagList from './tag/TagList';
import { useTranslation } from 'react-i18next';
import useFilters from '../../../../hooks/useFilters';
import useSessionStorageState from '../../../../hooks/useSessionStorageState';

type Props = {
  config: DataConfig | undefined;
  isLoading: boolean | undefined;
  isError: boolean | undefined;
  pageTitle: string;
  projectOwnershipType: string;
  focusRef: RefObject<HTMLDivElement>;
  resultCount: number | undefined;
  onUpdate: () => void;
  onSubmit: () => void;
};

const SearchForm = ({ config, isLoading, isError, pageTitle, projectOwnershipType, focusRef, resultCount, onUpdate, onSubmit }: Props) => {
  const { clearAllFilters, hasFilters } = useFilters();
  const [isOptionsOpen, setOptionsOpen] = useSessionStorageState({ defaultValue: false, key: 'searchFormOptionsOpen' });
  const [isOptionsVisible, setOptionsVisible] = useSessionStorageState({
    defaultValue: false,
    key: 'searchFormOptionsVisible',
  });
  const collapsedFiltersRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { filters } = config || {};
  const {
    project_district,
    project_district_hitas,
    project_district_haso,
    room_count,
    living_area,
    debt_free_sales_price,
    ...additionalFilters
  } = filters || {};

  useEffect(() => {
    onUpdate();
  }, [onUpdate, filters]);

  const searchButton = () => (
    <Button className={styles.submitButton} onClick={() => onSubmit()} iconLeft={<IconSearch aria-hidden="true" />}>
      {t('SEARCH:search')} ({resultCount})
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
            <div className={styles.dropdownWrapper}>
              {debt_free_sales_price && <Dropdown name={FilterName.DebtFreeSalesPrice} {...debt_free_sales_price} />}
            </div>
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
        <Collapsible
          id={'optionsCollapse'}
          expand={isOptionsOpen}
          onCollapse={() => {
            setOptionsVisible(false);
          }}
        >
          <div className={styles.row}>
            <div className={styles.divider} />
          </div>
          <div
            className={cx(styles.row, styles.hasTopPadding, styles.hasBottomPadding)}
            ref={collapsedFiltersRef}
            tabIndex={-1}
            role="region"
          >
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
        {filters && (
          <div className={styles.row}>
            <div className={styles.column} role="region" aria-label={t('SEARCH:aria-active-filters')}>
              <TagList filters={filters} />
            </div>
          </div>
        )}
        <div className={styles.searchButtonMobile}>{!isLoading && searchButton()}</div>
        <div className={styles.row}>
          <div>
            <div className={styles.divider} />
          </div>
        </div>
        <div className={cx(styles.row, styles.hasTopPadding)}>
          <div className={cx(styles.column, styles.textCenterMobile)}>
            <button
              className={styles.showMoreButton}
              onClick={() => {
                if (isOptionsOpen) {
                  setOptionsOpen(false);
                } else {
                  setOptionsOpen(true);
                  setOptionsVisible(true);
                  collapsedFiltersRef.current?.focus();
                }
              }}
              aria-controls="optionsCollapse"
              aria-expanded={isOptionsOpen ? true : false}
            >
              {isOptionsOpen ? (
                <>
                  <IconMinus aria-hidden="true" />
                  <span>{t('SEARCH:show-less-options')}</span>
                </>
              ) : (
                <>
                  <IconPlus aria-hidden="true" />
                  <span>{t('SEARCH:show-more-options')}</span>
                </>
              )}
            </button>
          </div>
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
      <div className="sr-only">
        <button type="button" onClick={() => onSubmit()}>
          {t('SEARCH:search')}
        </button>
      </div>
    </section>
  );
};

export default SearchForm;
