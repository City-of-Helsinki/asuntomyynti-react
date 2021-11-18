import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp, IconPenLine } from 'hds-react';

import { Apartment } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import RenderAvailabilityInfo from '../ApplicationStatus';
import useSessionStorageState from '../../../../../hooks/useSessionStorageState';

import css from './ApartmentRow.module.scss';

const BREAK_POINT = 768;

type Props = {
  apartment: Apartment;
  userApplications: number[] | undefined;
  applicationStatus: string | undefined;
  userHasApplicationForProject: boolean;
  projectOwnershipIsHaso: boolean;
};

const ApartmentRow = ({
  apartment,
  userApplications,
  applicationStatus,
  userHasApplicationForProject,
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
  const [width, setWidth] = useState(window.innerWidth);
  const [rowOpen, setRowOpen] = useSessionStorageState({ defaultValue: false, key: `apartmentRowOpen-${nid}` });

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

  const userHasApplicationForApartment = () => {
    if (!userApplications) {
      return false;
    }
    return userApplications.includes(nid);
  };

  const calculatedDebtFreeSalesPrice = debt_free_sales_price / 100;
  const formattedDebtFreeSalesPrice = `${calculatedDebtFreeSalesPrice.toLocaleString('fi-FI')} \u20AC`;

  const calculatedRightOfOccupancyPayment = right_of_occupancy_payment / 100;
  const formattedRightOfOccupancyPayment = `${calculatedRightOfOccupancyPayment.toLocaleString('fi-FI')} \u20AC`;

  const formattedLivingArea = `${living_area.toLocaleString('fi-FI')} m\u00b2`;

  const isApartmentFree = apartment_state_of_sale === 'FREE_FOR_RESERVATIONS';
  const isApartmentOpenForApplications = apartment_state_of_sale === 'OPEN_FOR_APPLICATIONS';

  const canCreateApplication = isApartmentOpenForApplications && !userHasApplicationForProject;

  const apartmentRowBaseDetails = (
    <>
      <strong>
        <span className="sr-only">{t('SEARCH:apartment')}: </span>
        {apartment_number}
      </strong>
      {isMobileSize ? (
        <>
          <span className={css.apartmentAvailabilityMobile}>
            <RenderAvailabilityInfo status={isApartmentFree ? 'FREE' : applicationStatus} dotOnly={true} />
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
      ) : (
        <span>
          <span className="sr-only">{t('SEARCH:aria-apartment-structure')}: </span>
          {apartment_structure}
        </span>
      )}
    </>
  );

  const apartMentRowOtherDetails = (
    <>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:floor')}&nbsp; </span>
        <span>
          {floor} {floor_max && ` / ${floor_max}`}
        </span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:area')}&nbsp; </span>
        <span>{formattedLivingArea}</span>
      </div>
      {projectOwnershipIsHaso ? (
        <div className={css.cell}>
          <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>
            {t('SEARCH:right-of-occupancy-payment')}&nbsp;{' '}
          </span>
          <span>{formattedRightOfOccupancyPayment}</span>
        </div>
      ) : (
        <div className={css.cell}>
          <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>
            {t('SEARCH:free-of-debt-price')}&nbsp;{' '}
          </span>
          <span>{formattedDebtFreeSalesPrice}</span>
        </div>
      )}
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:applications')}&nbsp; </span>
        <span>
          <RenderAvailabilityInfo status={isApartmentFree ? 'FREE' : applicationStatus} />
        </span>
      </div>
    </>
  );

  const apartmentRowActions = (
    <div className={css.cellButtons}>
      {userHasApplicationForApartment() ? (
        <div className={css.verticalContent}>
          <div className={css.applicationSent}>
            <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
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
              <span className="hds-button__label">
                {t('SEARCH:view')}
                <span className="sr-only">
                  , {t('SEARCH:apartment')} {apartment_number}
                </span>
              </span>
            </a>
          )}
          {canCreateApplication && (
            <a
              href={fullURL(application_url)}
              className={`${css.createApplicationButton} hds-button hds-button--${
                isDesktopSize ? 'secondary' : 'primary'
              } hds-button--small`}
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
        </div>
      )}
    </div>
  );

  return (
    <li className={css.apartmentTableRow}>
      {isMobileSize ? (
        <>
          <button
            className={css.apartmentCellMobile}
            onClick={toggleRow}
            aria-controls={`apartment-row-details-${nid}`}
            aria-expanded={rowOpen ? true : false}
          >
            {apartmentRowBaseDetails}
          </button>
          <div
            className={rowOpen ? cx(css.mobileCells, css.open) : css.mobileCells}
            id={`apartment-row-details-${nid}`}
          >
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
    </li>
  );
};

export default ApartmentRow;
