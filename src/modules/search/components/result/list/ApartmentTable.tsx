import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { IconAngleLeft, IconAngleRight, IconSortAscending, IconSortDescending } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { Apartment, ApartmentApplicationStatusConfig } from '../../../../../types/common';
import { getApartmentApplicationStatus } from '../../../utils/getApplicationStatus';
import ApartmentRow from './ApartmentRow';
import css from './ApartmentTable.module.scss';

type Props = {
  apartments: Apartment[];
  applications: number[] | undefined;
  applicationStatus: ApartmentApplicationStatusConfig | undefined;
};

type SortProps = {
  key: string;
  direction: string;
  alphaNumeric: boolean;
};

const ApartmentTable = ({ apartments, applications, applicationStatus }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const paginationScrollRef = useRef<HTMLDivElement>(null);

  const useSortableData = (items: any) => {
    const sortDefaultProps = {
      key: 'apartment_number',
      direction: 'ascending',
      alphaNumeric: true,
    };
    const [sortConfig, setSortConfig] = React.useState<SortProps | null>(sortDefaultProps);

    const sortedApartments = React.useMemo(() => {
      let sortableApartments = [...items];

      if (sortConfig !== null) {
        if (sortConfig.alphaNumeric) {
          sortableApartments.sort((a, b) => {
            const firstValue = a[sortConfig.key].split(' ').join('');
            const secondValue = b[sortConfig.key].split(' ').join('');
            if (sortConfig.direction === 'ascending') {
              return firstValue.localeCompare(secondValue, 'fi', { numeric: true });
            }
            return secondValue.localeCompare(firstValue, 'fi', { numeric: true });
          });
        } else {
          sortableApartments.sort((a, b) => {
            const firstValue = a[sortConfig.key];
            const secondValue = b[sortConfig.key];

            if (firstValue < secondValue) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (firstValue > secondValue) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
      }
      return sortableApartments;
    }, [items, sortConfig]);

    const requestSort = (key: string, alphaNumeric: boolean) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction, alphaNumeric });
    };

    return { items: sortedApartments, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(apartments);
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
