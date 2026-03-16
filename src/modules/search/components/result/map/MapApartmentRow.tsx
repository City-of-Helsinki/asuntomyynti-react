import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconAngleDown, IconAngleUp, IconPenLine } from 'hds-react';

import { Apartment, ApartmentStateOfSale, ApplicationStatus } from '../../../../../types/common';
import { fullURL } from '../../../utils/fullURL';
import { getApartmentPrice } from '../../../utils/getApartmentPrice';
import { userHasApplicationForApartment } from '../../../utils/userApplications';
import RenderAvailabilityInfo from '../ApplicationStatus';
import useSessionStorageState from '../../../../../hooks/useSessionStorageState';
import formattedLivingArea from '../../../utils/formatLivingArea';

import css from './MapApartmentRow.module.scss';
import GetToKnowButton from '../list/GetToKnowButton';
import CreateApplicationButton from '../list/CreateApplicationButton';
import ContactUsButton from '../list/ContactUsButton';

type Props = {
  apartment: Apartment;
  userApplications: number[] | undefined;
  applicationStatus: string | undefined;
  userHasReservedOrSoldApartmentInProject: boolean;
  isMobileSize: boolean;
  projectOwnershipIsHaso: boolean;
};

const MapApartmentRow = ({
  apartment,
  userApplications,
  applicationStatus,
  userHasReservedOrSoldApartmentInProject,
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

  const isApartmentFree =
    apartment_state_of_sale === ApartmentStateOfSale.FREE_FOR_RESERVATIONS.valueOf();

  const now = new Date().getTime();
  const applicationStartTime = apartment.project_application_start_time
    ? new Date(apartment.project_application_start_time).getTime()
    : undefined;
  const applicationEndTime = apartment.project_application_end_time
    ? new Date(apartment.project_application_end_time).getTime()
    : undefined;

  const isApplicationPeriodActive =
    applicationStartTime !== undefined &&
    applicationEndTime !== undefined &&
    now >= applicationStartTime &&
    now <= applicationEndTime;
  // Align with Drupal: can_apply_afterwards comes from backend logic.
  const canApplyAfterwards = apartment.project_can_apply_afterwards;
  // Allow application when application period is active or after-application is allowed,
  // as long as the user does not already have a reserved or sold apartment in the project,
  // and the apartment is not marked as free_for_reservations (those should use the contact button).
  const canCreateApplication =
    !isApartmentFree &&
    (isApplicationPeriodActive || canApplyAfterwards) &&
    !userHasReservedOrSoldApartmentInProject;
  const contactUrl = `${window.location.origin}/contact/apply_for_free_apartment?apartment=${apartment.apartment_number}&project=${apartment.project_id}`;

  const isApartmentReserved =
    apartment_state_of_sale === ApartmentStateOfSale.RESERVED.valueOf() ||
    apartment_state_of_sale === ApartmentStateOfSale.RESERVED_HASO.valueOf();
  const isApartmentSold = apartment_state_of_sale === ApartmentStateOfSale.SOLD.valueOf();

  let reservedOrSoldLabel = '';
  if (isApartmentSold) {
    reservedOrSoldLabel = t('SEARCH:apartment-sold');
  } else if (isApartmentReserved) {
    reservedOrSoldLabel = t('SEARCH:apartment-reserved');
  } else if (!isApplicationPeriodActive && isApartmentFree) {
    // Outside application period, show "free" instead of application count.
    reservedOrSoldLabel = t('SEARCH:apartment-free');
  }

  let statusForDot: string;
  if (isApartmentReserved) {
    statusForDot = ApplicationStatus.Reserved;
  } else if (isApartmentSold) {
    statusForDot = ApplicationStatus.Sold;
  } else {
    statusForDot = applicationStatus || ApplicationStatus.Low;
  }

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
          {floor} {!!floor_max && floor_max > 1 && ` / ${floor_max}`}
        </span>
      </div>
      <div>
        <span className="sr-only">{t('SEARCH:area')}</span>
        <span>{formattedLivingArea(living_area)}</span>
      </div>
      <div>
        <span className="sr-only">
          {projectOwnershipIsHaso ? t('SEARCH:right-of-occupancy-payment') : t('SEARCH:free-of-debt-price')}
        </span>
        <span>{getApartmentPrice(apartment)}</span>
      </div>
    </>
  );

  const apartmentRowBaseDetailsMobile = (
    <>
      <span className="sr-only">{t('SEARCH:apartment')}</span>
      <strong>{apartment_number}</strong>
      <span className={css.apartmentAvailabilityMobile}>
        <RenderAvailabilityInfo status={statusForDot} dotOnly={true} labelOverride={reservedOrSoldLabel || undefined} />
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
          {floor} {!!floor_max && floor_max > 1 && ` / ${floor_max}`}
        </span>
      </div>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:area')}</span>
        <span>{formattedLivingArea(living_area)}</span>
      </div>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>
          {projectOwnershipIsHaso ? t('SEARCH:right-of-occupancy-payment') : t('SEARCH:free-of-debt-price')}
        </span>
        <span>{getApartmentPrice(apartment)}</span>
      </div>
      <div className={css.mobileCell}>
        <span className={css.cellMobileTitle}>{t('SEARCH:applications')}</span>
        <span>
          <RenderAvailabilityInfo status={statusForDot} labelOverride={reservedOrSoldLabel || undefined} />
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
          {url && (<GetToKnowButton
            href={fullURL(url)}
            apartment={apartment}
            isDesktopSize={isDesktopSize}
          />)}
          {canCreateApplication && (
              <CreateApplicationButton
                href={fullURL(application_url)}
                apartment={apartment}
                showAfterApplicationLabel={canApplyAfterwards}
              />
            )}
          {isApartmentFree && !canApplyAfterwards && (
            <ContactUsButton
              href={fullURL(contactUrl)}
              apartment={apartment}
              isDesktopSize={isDesktopSize}
            />
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
              <RenderAvailabilityInfo status={statusForDot} dotOnly={false} labelOverride={reservedOrSoldLabel || undefined} />
            </div>
            {apartmentRowActions}
          </>
        )}
      </div>
    </div>
  );
};

export default MapApartmentRow;
