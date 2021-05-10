import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp, IconPenLine } from 'hds-react';

import { Apartment } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import RenderAvailabilityInfo from '../ApplicationStatus';

import css from './MapApartmentRow.module.scss';

type Props = {
  apartment: Apartment;
  userApplications: number[] | undefined;
  applicationStatus: string | undefined;
  isMobileSize: boolean;
};

const MapApartmentRow = ({ apartment, userApplications, applicationStatus, isMobileSize }: Props) => {
  const { t } = useTranslation();
  const [rowOpen, setRowOpen] = useState(false);

  const isDesktopSize = !isMobileSize;

  const toggleRow = () => {
    if (isMobileSize) {
      setRowOpen(!rowOpen);
    }
  };

  const {
    apartment_number,
    apartment_structure,
    application_url,
    floor,
    floor_max,
    nid,
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

  const canApply = new Date().getTime() < new Date(project_application_end_time).getTime();

  const apartmentRowBaseDetails = (
    <>
      <div>
        <strong style={{ marginRight: 15 }}>{apartment_number}</strong>
        <span>{apartment_structure}</span>
      </div>
      <div>
        <span className="sr-only">{t('SEARCH:floor')}</span>
        <span>
          {floor} {floor_max && ` / ${floor_max}`}
        </span>
      </div>
      <div>
        <span className="sr-only">{t('SEARCH:area')}</span>
        <span>{formattedLivingArea}</span>
      </div>
      <div>
        <span className="sr-only">{t('SEARCH:free-of-debt-price')}</span>
        <span>{formattedDebtFreeSalesPrice}</span>
      </div>
    </>
  );

  const apartmentRowBaseDetailsMobile = (
    <>
      <span className="sr-only">{t('SEARCH:apartment')}</span>
      <strong>{apartment_number}</strong>
      <span className={css.apartmentAvailabilityMobile}>
        <RenderAvailabilityInfo status={applicationStatus} dotOnly={true} />
      </span>
      <span>{apartment_structure}</span>
      {rowOpen ? (
        <IconAngleUp style={{ marginLeft: 'auto' }} size={'m'} aria-hidden="true" />
      ) : (
        <IconAngleDown style={{ marginLeft: 'auto' }} size={'m'} aria-hidden="true" />
      )}
    </>
  );

  const apartMentRowOtherDetailsMobile = (
    <div className={css.mobileCells}>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:floor')}</span>
        <span>
          {floor} {floor_max && ` / ${floor_max}`}
        </span>
      </div>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:area')}</span>
        <span>{formattedLivingArea}</span>
      </div>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:free-of-debt-price')}</span>
        <span>{formattedDebtFreeSalesPrice}</span>
      </div>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:applications')}</span>
        <span>
          <RenderAvailabilityInfo status={applicationStatus} />
        </span>
      </div>
    </div>
  );

  const apartmentRowActions = (
    <div className={css.apartmentActions}>
      {hasApplication() ? (
        <>
          <div className={css.applicationSent}>
            <IconPenLine style={{ marginRight: 8 }} aria-hidden="true" />
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
        </>
      ) : (
        <>
          {url && (
            <a
              href={fullURL(url)}
              className={`${css.getToKnowButton} hds-button hds-button--${
                isDesktopSize ? 'supplementary' : 'secondary'
              } hds-button--small`}
            >
              <span className="hds-button__label">{t('SEARCH:learn-more-apartments')}</span>
            </a>
          )}
          {canApply && (
            <a
              href={fullURL(application_url)}
              className={`${css.createApplicationButton} hds-button hds-button--primary hds-button--small`}
            >
              <span className="hds-button__label">{t('SEARCH:apply')}</span>
            </a>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className={css.apartmentRow}>
      <div className={css.apartmentRowContent}>
        {isMobileSize ? (
          <>
            <button className={css.apartmentDetailsMobile} onClick={toggleRow}>
              {apartmentRowBaseDetailsMobile}
            </button>
            {rowOpen && (
              <>
                {apartMentRowOtherDetailsMobile}
                {apartmentRowActions}
              </>
            )}
          </>
        ) : (
          <>
            <div className={css.apartmentDetails}>{apartmentRowBaseDetails}</div>
            <div className={css.apartmentAvailability}>
              <RenderAvailabilityInfo status={applicationStatus} dotOnly={false} />
            </div>
            {apartmentRowActions}
          </>
        )}
      </div>
    </div>
  );
};

export default MapApartmentRow;
