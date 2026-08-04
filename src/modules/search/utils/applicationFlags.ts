import { Apartment, ApartmentStateOfSale, OwnershipType } from '../../../types/common';

export type ApplicationFlags = {
  isApartmentFree: boolean;
  isApplicationPeriodActive: boolean;
  applicationPeriodHasEnded: boolean;
  canApplyAfterwards: boolean;
  canCreateApplication: boolean;
  canMakeReservation: boolean;
  contactUrl: string;
  applicationUrl: string;
  ownershipType: OwnershipType;
};

/**
 * Resolve application / reservation CTA flags from indexed apartment fields.
 *
 * Late reservation is allowed only when the application period has ended
 * (not merely inactive), project_can_apply_afterwards is true, ownership is
 * not HASO, and the apartment is FREE_FOR_RESERVATIONS.
 */
export const computeApplicationFlags = (
  apartment: Apartment,
  userHasReservedOrSoldApartmentInProject: boolean,
  projectOwnershipIsHaso: boolean
): ApplicationFlags => {
  const isApartmentFree = apartment.apartment_state_of_sale === ApartmentStateOfSale.FREE_FOR_RESERVATIONS.valueOf();

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

  // Late reservation only when the period has ended — never before it starts
  // or when dates are missing.
  const applicationPeriodHasEnded = applicationEndTime !== undefined && now > applicationEndTime;

  const canApplyAfterwards = apartment.project_can_apply_afterwards;

  const ownershipFromApartment = apartment.project_ownership_type?.toLowerCase();
  let ownershipType: OwnershipType;
  if (ownershipFromApartment === OwnershipType.haso) {
    ownershipType = OwnershipType.haso;
  } else if (ownershipFromApartment === OwnershipType.puolihitas) {
    ownershipType = OwnershipType.puolihitas;
  } else if (ownershipFromApartment === OwnershipType.hitas) {
    ownershipType = OwnershipType.hitas;
  } else {
    ownershipType = projectOwnershipIsHaso ? OwnershipType.haso : OwnershipType.hitas;
  }

  // Always build from indexed ownership/project fields so the CTA does not
  // depend on a possibly stale Elasticsearch application_url after the
  // application period ends.
  const applicationUrl = `${window.location.origin}/application/add/${ownershipType}/${apartment.project_id}`;

  const contactUrl = `${window.location.origin}/contact/apply_for_free_apartment?apartment=${apartment.apartment_number}&project=${apartment.project_id}`;

  // HITAS/puolihitas post-period reservation: period ended, can apply afterwards,
  // apartment still free for reservations.
  const canMakeReservation =
    !projectOwnershipIsHaso &&
    applicationPeriodHasEnded &&
    canApplyAfterwards &&
    isApartmentFree &&
    !userHasReservedOrSoldApartmentInProject;

  // Regular / HASO after-application path. HITAS after-period uses canMakeReservation.
  const canCreateApplication =
    !canMakeReservation &&
    !isApartmentFree &&
    (isApplicationPeriodActive || (canApplyAfterwards && projectOwnershipIsHaso)) &&
    !userHasReservedOrSoldApartmentInProject;

  return {
    isApartmentFree,
    isApplicationPeriodActive,
    applicationPeriodHasEnded,
    canApplyAfterwards,
    canCreateApplication,
    canMakeReservation,
    contactUrl,
    applicationUrl,
    ownershipType,
  };
};
