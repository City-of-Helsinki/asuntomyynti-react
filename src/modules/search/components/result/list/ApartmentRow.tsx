import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp, IconPenLine } from 'hds-react';

import { Apartment } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import RenderAvailabilityInfo from '../ApplicationStatus';

import css from './ApartmentRow.module.scss';

const BREAK_POINT = 768;

type Props = {
  apartment: Apartment;
  userApplications: number[] | undefined;
  applicationStatus: string | undefined;
};

const ApartmentRow = ({ apartment, userApplications, applicationStatus }: Props) => {
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
    apartment_state_of_sale,
    apartment_structure,
    application_url,
    floor,
    floor_max,
    nid,
    project_application_start_time,
    project_application_end_time,
    living_area,
    debt_free_sales_price,
    url,
  } = apartment;

  const hasApplication = () => {
    if (!userApplications) {
      return false;
    }
    return userApplications.includes(nid);
  };

  const calculatedDebtFreeSalesPrice = debt_free_sales_price / 100;
  const formattedDebtFreeSalesPrice = `${calculatedDebtFreeSalesPrice.toLocaleString('fi-FI')} \u20AC`;

  const formattedLivingArea = `${living_area.toLocaleString('fi-FI')} m\u00b2`;

  const isApartmentFree = apartment_state_of_sale === 'FREE_FOR_RESERVATIONS';
  const isApartmentOpenForApplications = apartment_state_of_sale === 'OPEN_FOR_APPLICATIONS';

  const applicationPeriodHasStarted = new Date().getTime() > new Date(project_application_start_time).getTime();
  const applicationPeriodHasEnded = new Date().getTime() > new Date(project_application_end_time).getTime();

  const canCreateApplication =
    isApartmentOpenForApplications && applicationPeriodHasStarted && !applicationPeriodHasEnded;

  const apartmentRowBaseDetails = (
    <>
      {isMobileSize && <span className="sr-only">{t('SEARCH:apartment')}</span>}
      <strong>{apartment_number}</strong>
      {isMobileSize && (
        <span className={css.apartmentAvailabilityMobile}>
          <RenderAvailabilityInfo status={isApartmentFree ? 'FREE' : applicationStatus} dotOnly={true} />
        </span>
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
        <span>
          <RenderAvailabilityInfo status={isApartmentFree ? 'FREE' : applicationStatus} />
        </span>
      </div>
    </>
  );

  const apartmentRowActions = (
    <div className={css.cellButtons}>
      {hasApplication() ? (
        <div className={css.verticalContent}>
          <div className={css.applicationSent}>
            <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
            <span>{t('SEARCH:user-application-apartment')}</span>
          </div>
          <a
            href={fullURL(url)}
            className={`${css.openApartmentDetailsButton} hds-button hds-button--${
              isDesktopSize ? 'secondary' : 'primary'
            } hds-button--small`}
          >
            <span className="hds-button__label">{t('SEARCH:open-apartment-page')}</span>
          </a>
        </div>
      ) : (
        <div className={css.buttons}>
          {url && (
            <a
              href={fullURL(url)}
              className={`${css.getToKnowButton} hds-button hds-button--${
                isDesktopSize ? 'supplementary' : 'secondary'
              } hds-button--small`}
            >
              <span className="hds-button__label">{t('SEARCH:info')}</span>
            </a>
          )}
          {canCreateApplication && (
            <a
              href={fullURL(application_url)}
              className={`${css.createApplicationButton} hds-button hds-button--${
                isDesktopSize ? 'secondary' : 'primary'
              } hds-button--small`}
            >
              <span className="hds-button__label">{t('SEARCH:apply')}</span>
            </a>
          )}
          {/* TODO: Form URL for free apartments
          {isApartmentFree && (
            <a
              href={'#'}
              className={`${css.createApplicationButton} hds-button hds-button--${
                isDesktopSize ? 'secondary' : 'primary'
              } hds-button--small`}
            >
              <span className="hds-button__label">{t('SEARCH:contact-us')}</span>
            </a>
          )}
          */}
        </div>
      )}
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
