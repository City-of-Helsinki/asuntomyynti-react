import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import css from './ApartmentRow.module.scss';
import { Apartment, StateOfAvailability } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp /* TODO IconPenLine */ } from 'hds-react';

const BREAK_POINT = 768;

const ApartmentRow = ({ apartment }: { apartment: Apartment }) => {
  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [rowOpen, setRowOpen] = useState(false);

  const isDesktopSize = width > BREAK_POINT;
  const isMobileSize = width <= BREAK_POINT;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const toggleRow = () => {
    if (isMobileSize) {
      setRowOpen(!rowOpen);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    apartment_number,
    apartment_structure,
    application_url,
    floor,
    floor_max,
    living_area,
    debt_free_sales_price,
    url,
  } = apartment;

  const calculatedDebtFreeSalesPrice = debt_free_sales_price / 100;
  const formattedDebtFreeSalesPrice = `${calculatedDebtFreeSalesPrice.toLocaleString('fi-FI')} \u20AC`;

  const formattedLivingArea = `${living_area.toLocaleString('fi-FI')} m\u00b2`;

  const fullURL = (path: string) => {
    if (!path) {
      return undefined;
    }
    if (path.toLowerCase().startsWith('http')) {
      return path;
    }
    return `http://${path}`;
  };

  // TODO: get the actual availability data for each apartment instead of giving fixed value for all of them
  const availability = StateOfAvailability.NoApplications;

  const renderAvailabilityInfo = (status: StateOfAvailability, dotOnly: boolean) => {
    switch (status) {
      case StateOfAvailability.Free:
        return (
          <>
            <span className={cx(css.statusCircle, css.statusCircleFree)} aria-hidden="true" />
            <span className={dotOnly ? 'sr-only' : ''}>{t('SEARCH:apartment-free')}</span>
          </>
        );
      case StateOfAvailability.NoApplications:
        return (
          <>
            <span className={cx(css.statusCircle, css.statusCircleNone)} aria-hidden="true" />
            <span className={dotOnly ? 'sr-only' : ''}>{t('SEARCH:apartment-no-applications')}</span>
          </>
        );
      case StateOfAvailability.OnlyFewApplications:
        return (
          <>
            <span className={cx(css.statusCircle, css.statusCircleFew)} aria-hidden="true" />
            <span className={dotOnly ? 'sr-only' : ''}>{t('SEARCH:apartment-few-applications')}</span>
          </>
        );
      case StateOfAvailability.SomeApplications:
        return (
          <>
            <span className={cx(css.statusCircle, css.statusCircleSome)} aria-hidden="true" />
            <span className={dotOnly ? 'sr-only' : ''}>{t('SEARCH:apartment-some-applications')}</span>
          </>
        );
      case StateOfAvailability.LotsOfApplications:
        return (
          <>
            <span className={cx(css.statusCircle, css.statusCircleLots)} aria-hidden="true" />
            <span className={dotOnly ? 'sr-only' : ''}>{t('SEARCH:apartment-lots-of-applications')}</span>
          </>
        );
      default:
        return '-';
    }
  };

  const apartmentRowBaseDetails = (
    <>
      {isMobileSize && <span className="sr-only">{t('SEARCH:apartment')}</span>}
      <strong>{apartment_number}</strong>
      {isMobileSize && (
        <span className={css.apartmentAvailabilityMobile}>{renderAvailabilityInfo(availability, true)}</span>
      )}
      <span>{apartment_structure}</span>
      {isMobileSize &&
        (rowOpen ? (
          <IconAngleUp style={{ marginLeft: 'auto' }} size={'m'} aria-hidden="true" />
        ) : (
          <IconAngleDown style={{ marginLeft: 'auto' }} size={'m'} aria-hidden="true" />
        ))}
    </>
  );

  const apartMentRowOtherDetails = (
    <>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:floor')}</span>
        <span>
          {floor} {floor_max && ` / ${floor_max}`}
        </span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:area')}</span>
        <span>{formattedLivingArea}</span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:free-of-debt-price')}</span>
        <span>{formattedDebtFreeSalesPrice}</span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:applications')}</span>
        <span>{renderAvailabilityInfo(availability, false)}</span>
      </div>
    </>
  );

  const apartmentRowActions = (
    <div className={css.cellButtons}>
      {/* TODO
      <div className={css.verticalContent}>
        <div className={css.applicationSent}>
          <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
          <span>Sinulla on <a href="#">hakemus</a> tähän kohteeseen</span>
        </div>
        <a
          href={fullURL(url) || '#'}
          className={`${css.openApartmentDetailsButton} hds-button hds-button--${isDesktopSize ? 'secondary' : 'primary' } hds-button--small`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hds-button__label">Avaa huoneistosivu</span>
        </a>
      </div>
      */}
      <div className={css.buttons}>
        <a
          href={fullURL(url) || '#'}
          className={`${css.getToKnowButton} hds-button hds-button--${
            isDesktopSize ? 'supplementary' : 'secondary'
          } hds-button--small`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hds-button__label">{t('SEARCH:info')}</span>
        </a>
        <a
          href={fullURL(application_url) || '#'}
          className={`${css.createApplicationButton} hds-button hds-button--${
            isDesktopSize ? 'secondary' : 'primary'
          } hds-button--small`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hds-button__label">{t('SEARCH:apply')}</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className={css.apartmentTableRow}>
      {isMobileSize ? (
        <>
          <button className={css.apartmentCellMobile} onClick={toggleRow}>
            {apartmentRowBaseDetails}
          </button>
          <div className={rowOpen ? cx(css.mobileCells, css.open) : css.mobileCells}>
            {apartMentRowOtherDetails}
            {apartmentRowActions}
          </div>
        </>
      ) : (
        <>
          <div className={cx(css.cell, css.apartmentCell)}>{apartmentRowBaseDetails}</div>
          {apartMentRowOtherDetails}
          {apartmentRowActions}
        </>
      )}
    </div>
  );
};

export default ApartmentRow;
