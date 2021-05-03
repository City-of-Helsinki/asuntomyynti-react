import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { IconAngleLeft, IconAngleRight, IconSortAscending, IconSortDescending } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { Apartment, ApartmentApplicationStatusConfig } from '../../../../../types/common';
import { getApartmentApplicationStatus } from '../../../utils/getApplicationStatus';
import SortApartments from '../../../utils/sortApartments';
import ApartmentRow from './ApartmentRow';
import css from './ApartmentTable.module.scss';

type Props = {
  apartments: Apartment[];
  applications: number[] | undefined;
  applicationStatus: ApartmentApplicationStatusConfig | undefined;
};

const ApartmentTable = ({ apartments, applications, applicationStatus }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const paginationScrollRef = useRef<HTMLDivElement>(null);
  const { items, requestSort, sortConfig } = SortApartments(apartments);
  const displayedApartments = items.slice(page * 10 - 10, page * 10);

  const setSort = (key: string, alphaNumeric: boolean) => {
    requestSort(key, alphaNumeric);
    setPage(1);
  };

  const getSortDirectionFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const apartmentSortClasses = (key: string) => {
    return cx(css.sortButton, {
      [css.activeSort]: sortConfig ? sortConfig.key === key : false,
      [css.ascending]: getSortDirectionFor(key) === 'ascending',
      [css.descending]: getSortDirectionFor(key) === 'descending',
    });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig) {
      return;
    }
    if (getSortDirectionFor(key) === 'descending') {
      return <IconSortDescending aria-hidden="true" className={css.sortArrow} />;
    }
    return <IconSortAscending aria-hidden="true" className={css.sortArrow} />;
  };

  const showPagination = apartments.length > 10;

  const renderPaginationButtons = () => {
    const noOfPages = Math.ceil(apartments.length / 10);
    const buttons = [];

    buttons.push(
      <button
        key={'pagination-btn-prev'}
        className={css.paginationButton}
        onClick={() => handlePageClick(page !== 1 ? page - 1 : page)}
        value={page !== 1 ? page - 1 : page}
        aria-label={t('SEARCH:previous-page')}
        disabled={page === 1}
      >
        <IconAngleLeft aria-hidden="true" />
      </button>
    );

    for (let i = 1; i <= noOfPages; i++) {
      buttons.push(
        <button
          key={i}
          className={css.paginationButton}
          onClick={() => handlePageClick(i)}
          style={i === page ? { border: '2px solid #1a1a1a' } : {}}
          value={i}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key={'pagination-btn-next'}
        className={css.paginationButton}
        onClick={() => handlePageClick(page !== noOfPages ? page + 1 : page)}
        value={page !== noOfPages ? page + 1 : page}
        aria-label={t('SEARCH:next-page')}
        disabled={page === noOfPages}
      >
        <IconAngleRight aria-hidden="true" />
      </button>
    );

    return buttons;
  };

  const paginationScroll = () => {
    if (paginationScrollRef.current) {
      paginationScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageClick = (index: number) => {
    if (index !== page) {
      paginationScroll();
      setPage(index);
    }
  };

  return (
    <div className={css.apartmentList} ref={paginationScrollRef}>
      <div className={css.apartmentListTable}>
        <div className={css.apartmentListHeaders}>
          <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellApartment)}>
            <button
              type="button"
              onClick={() => setSort('apartment_number', true)}
              className={apartmentSortClasses('apartment_number')}
            >
              <span>{t('SEARCH:apartment')}</span>
              {getSortIcon('apartment_number')}
            </button>
          </div>
          <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellNarrow)}>
            <button type="button" onClick={() => setSort('floor', false)} className={apartmentSortClasses('floor')}>
              <span>{t('SEARCH:floor')}</span>
              {getSortIcon('floor')}
            </button>
          </div>
          <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellNarrow)}>
            <button
              type="button"
              onClick={() => setSort('living_area', false)}
              className={apartmentSortClasses('living_area')}
            >
              <span>{t('SEARCH:area')}</span>
              {getSortIcon('living_area')}
            </button>
          </div>
          <div className={cx(css.headerCell, css.headerCellSortable, css.headerCellNarrow)}>
            <button
              type="button"
              onClick={() => setSort('debt_free_sales_price', false)}
              className={apartmentSortClasses('debt_free_sales_price')}
            >
              <span>{t('SEARCH:free-of-debt-price')}</span>
              {getSortIcon('debt_free_sales_price')}
            </button>
          </div>
          <div className={cx(css.headerCell, css.headerCellNarrow, css.headerCellSpan)}>
            <span>{t('SEARCH:applications')}</span>
          </div>
          <div className={cx(css.headerCell, css.headerCellSpacer)} />
        </div>
        {displayedApartments.map((x) => (
          <ApartmentRow
            key={x.uuid}
            apartment={x}
            userApplications={applications}
            applicationStatus={getApartmentApplicationStatus(applicationStatus, x.nid)}
          />
        ))}
      </div>
      {showPagination && <div className={css.pagination}>{renderPaginationButtons()}</div>}
    </div>
  );
};

export default ApartmentTable;
