import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp, IconPenLine } from 'hds-react';

import { Apartment, ApartmentStateOfSale, OwnershipType } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import { getApartmentPrice } from '../../../utils/getApartmentPrice';
import { userHasApplicationForApartment, userHasReservedOrSoldApartment } from '../../../utils/userApplications';
import RenderAvailabilityInfo from '../ApplicationStatus';
import useSessionStorageState from '../../../../../hooks/useSessionStorageState';
import formattedLivingArea from '../../../utils/formatLivingArea';

import css from './ApartmentRow.module.scss';
import CreateApplicationButton from './CreateApplicationButton';
import ContactUsButton from './ContactUsButton';
import GetToKnowButton from './GetToKnowButton';

const BREAK_POINT = 768;

type Props = {
  apartment: Apartment;
  userApplications: number[] | undefined;
  applicationStatus: string | undefined;
  userHasApplicationForProject: boolean;
  userHasReservedOrSoldApartmentInProject: boolean;
  projectOwnershipIsHaso: boolean;
};

const ApartmentRow = ({
  apartment,
  userApplications,
  applicationStatus,
  userHasApplicationForProject,
  userHasReservedOrSoldApartmentInProject,
  projectOwnershipIsHaso,
}: Props) => {
  const {
    apartment_number,
    apartment_state_of_sale,
    apartment_structure,
    floor,
    floor_max,
    nid,
    living_area,
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

  const isApartmentFree = apartment_state_of_sale === ApartmentStateOfSale.FREE_FOR_RESERVATIONS.valueOf();
  const isApartmentOpenForApplications =
    apartment_state_of_sale === ApartmentStateOfSale.OPEN_FOR_APPLICATIONS.valueOf();
  const applicationEndTimeHasPassed = new Date().getTime() > new Date(apartment.project_application_end_time).getTime();
  const canApplyAfterwards = apartment.project_can_apply_afterwards && applicationEndTimeHasPassed && projectOwnershipIsHaso;

  const ownershipType = projectOwnershipIsHaso ? OwnershipType.haso : OwnershipType.hitas;
  const contactUrl = `${window.location.origin}/contact/apply_for_free_apartment?apartment=${apartment.apartment_number}&project=${apartment.project_id}`

  // dont depend on the application_url set in Drupal, but allow using it in case an override is needed
  const applicationUrl = apartment.application_url || `${window.location.origin}/application/add/${ownershipType}/${apartment.project_id}`
  
  // apartment status is OPEN_FOR_APPLICATIONS or apartment fulfills criteria for after-application
  // user has no applications, reservations or hasn't been sold an apartment in the project
  const canCreateApplication = (isApartmentOpenForApplications || canApplyAfterwards) && !userHasApplicationForProject && !userHasReservedOrSoldApartmentInProject;

  const apartmentRowBaseDetails = (
    <>
      <strong>
        <span className="sr-only">{t('SEARCH:apartment')}: </span>
        {apartment_number}
      </strong>
      {isMobileSize ? (
        <>
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
          {floor} {!!floor_max && floor_max > 1 && ` / ${floor_max}`}
        </span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:area')}&nbsp; </span>
        <span>{formattedLivingArea(living_area)}</span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>
          {projectOwnershipIsHaso ? t('SEARCH:right-of-occupancy-payment') : t('SEARCH:free-of-debt-price')}&nbsp;{' '}
        </span>
        <span>{getApartmentPrice(apartment)}</span>
      </div>
      <div className={css.cell}>
        <span className={isDesktopSize ? 'sr-only' : css.cellMobileTitle}>{t('SEARCH:applications')}&nbsp; </span>
        <span>
          <RenderAvailabilityInfo status={isApartmentFree ? 'VACANT' : applicationStatus} />
        </span>
      </div>
    </>
  );

  const apartmentRowActions = (
    <div className={css.cellButtons}>
      {userHasApplicationForApartment(userApplications, nid) ? (
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
          {url && (<GetToKnowButton
            href={fullURL(url)}
            apartment={apartment}
            isDesktopSize={isDesktopSize}
          />)}

          {
            canCreateApplication && (
              <CreateApplicationButton
                href={fullURL(applicationUrl)}
                apartment={apartment}
              />
            )
          }

          {isApartmentFree && !canApplyAfterwards && (
            <ContactUsButton
              href={fullURL(contactUrl)}
              apartment={apartment}
              isDesktopSize={isDesktopSize}
            />
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
