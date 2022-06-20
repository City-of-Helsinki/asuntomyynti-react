import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp, IconPenLine } from 'hds-react';

import { Apartment } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import { userHasApplicationForApartment } from '../../../utils/userApplications';
import RenderAvailabilityInfo from '../ApplicationStatus';
import useSessionStorageState from '../../../../../hooks/useSessionStorageState';
import formattedLivingArea from '../../../utils/formatLivingArea';
import formattedPrice from '../../../utils/formatPrice';

import css from './MapApartmentRow.module.scss';

type Props = {
  apartment: Apartment;
  userApplications: number[] | undefined;
  applicationStatus: string | undefined;
  userHasApplicationForProject: boolean;
  isMobileSize: boolean;
  projectOwnershipIsHaso: boolean;
};

const MapApartmentRow = ({
  apartment,
  userApplications,
  applicationStatus,
  userHasApplicationForProject,
  isMobileSize,
  projectOwnershipIsHaso,
}: Props) => {
  const {
    apartment_number,
    apartment_state_of_sale,
    apartment_structure,
    application_url,
    floor,
    floor_max,
    nid,
    living_area,
    debt_free_sales_price,
    right_of_occupancy_payment,
    url,
  } = apartment;

  const { t } = useTranslation();
  const [rowOpen, setRowOpen] = useSessionStorageState({ defaultValue: false, key: `MapApartmentRowOpen-${nid}` });

  const isDesktopSize = !isMobileSize;

  const toggleRow = () => {
    if (isMobileSize) {
      setRowOpen(!rowOpen);
    }
  };

  const isApartmentFree = apartment_state_of_sale === 'FREE_FOR_RESERVATIONS';
  const isApartmentOpenForApplications = apartment_state_of_sale === 'OPEN_FOR_APPLICATIONS';

  const canCreateApplication = isApartmentOpenForApplications && !userHasApplicationForProject;

  const apartmentRowBaseDetails = (
    <>
      <div>
        <strong style={{ marginRight: 15 }}>{apartment_number}</strong>
        <span>
          <span className="sr-only">{t('SEARCH:aria-apartment-structure')}: </span>
          {apartment_structure}
        </span>
      </div>
      <div>
        <span className="sr-only">{t('SEARCH:floor')}</span>
        <span>
          {floor} {floor_max && ` / ${floor_max}`}
        </span>
      </div>
      <div>
        <span className="sr-only">{t('SEARCH:area')}</span>
        <span>{formattedLivingArea(living_area)}</span>
      </div>
      {projectOwnershipIsHaso ? (
        <div>
          <span className="sr-only">{t('SEARCH:right-of-occupancy-payment')}</span>
          <span>{formattedPrice(right_of_occupancy_payment)}</span>
        </div>
      ) : (
        <div>
          <span className="sr-only">{t('SEARCH:free-of-debt-price')}</span>
          <span>{formattedPrice(debt_free_sales_price)}</span>
        </div>
      )}
    </>
  );

  const apartmentRowBaseDetailsMobile = (
    <>
      <span className="sr-only">{t('SEARCH:apartment')}</span>
      <strong>{apartment_number}</strong>
      <span className={css.apartmentAvailabilityMobile}>
        <RenderAvailabilityInfo status={isApartmentFree ? 'VACANT' : applicationStatus} dotOnly={true} />
      </span>
      <span>
        <span className="sr-only">{t('SEARCH:aria-apartment-structure')}: </span>
        {apartment_structure}
      </span>
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
        <span>{formattedLivingArea(living_area)}</span>
      </div>
      {projectOwnershipIsHaso ? (
        <div className={css.mobileCell}>
          <span className={css.cellMobileTitle}>{t('SEARCH:right-of-occupancy-payment')}</span>
          <span>{formattedPrice(right_of_occupancy_payment)}</span>
        </div>
      ) : (
        <div className={css.mobileCell}>
          <span className={css.cellMobileTitle}>{t('SEARCH:free-of-debt-price')}</span>
          <span>{formattedPrice(debt_free_sales_price)}</span>
        </div>
      )}
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:applications')}</span>
        <span>
          <RenderAvailabilityInfo status={isApartmentFree ? 'VACANT' : applicationStatus} />
        </span>
      </div>
    </div>
  );

  const apartmentRowActions = (
    <div className={css.apartmentActions}>
      {userHasApplicationForApartment(userApplications, nid) ? (
        <>
          <div className={css.applicationSent}>
            <IconPenLine style={{ marginRight: 8 }} aria-hidden="true" />
            <span>{t('SEARCH:user-application-apartment')}</span>
          </div>
          {url && (
            <a
              href={fullURL(url)}
              className={`${css.openApartmentDetailsButton} hds-button hds-button--${
                isDesktopSize ? 'secondary' : 'primary'
              } hds-button--small`}
            >
              <span className="hds-button__label">
                {t('SEARCH:open-apartment-page')}
                <span className="sr-only">
                  , {t('SEARCH:apartment')} {apartment_number}
                </span>
              </span>
            </a>
          )}
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
              <span className="hds-button__label">
                {t('SEARCH:learn-more-apartments')}
                <span className="sr-only">
                  , {t('SEARCH:apartment')} {apartment_number}
                </span>
              </span>
            </a>
          )}
          {canCreateApplication && (
            <a
              href={fullURL(application_url)}
              className={`${css.createApplicationButton} hds-button hds-button--primary hds-button--small`}
            >
              <span className="hds-button__label">
                {t('SEARCH:apply')}
                <span className="sr-only">
                  , {t('SEARCH:apartment')} {apartment_number}
                </span>
              </span>
            </a>
          )}
          {isApartmentFree && (
            <a
              href={fullURL(application_url)}
              className={`${css.createApplicationButton} hds-button hds-button--${
                isDesktopSize ? 'secondary' : 'primary'
              } hds-button--small`}
            >
              <span className="hds-button__label">
                {t('SEARCH:contact-us')}
                <span className="sr-only">
                  , {t('SEARCH:apartment')} {apartment_number}
                </span>
              </span>
            </a>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className={css.apartmentRow} role="listitem">
      <div className={css.apartmentRowContent}>
        {isMobileSize ? (
          <>
            <button
              className={css.apartmentDetailsMobile}
              onClick={toggleRow}
              aria-controls={`map-apartment-row-details-${nid}`}
              aria-expanded={rowOpen ? true : false}
            >
              {apartmentRowBaseDetailsMobile}
            </button>
            <div id={`map-apartment-row-details-${nid}`}>
              {rowOpen && (
                <>
                  {apartMentRowOtherDetailsMobile}
                  {apartmentRowActions}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={css.apartmentDetails}>{apartmentRowBaseDetails}</div>
            <div className={css.apartmentAvailability}>
              <span className="sr-only">{t('SEARCH:applications')}, </span>
              <RenderAvailabilityInfo status={isApartmentFree ? 'VACANT' : applicationStatus} dotOnly={false} />
            </div>
            {apartmentRowActions}
          </>
        )}
      </div>
    </div>
  );
};

export default MapApartmentRow;
