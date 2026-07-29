/**
 * Add the apartment node id to an application form url.
 *
 * Used by the HITAS post-period reservation flow, where the customer picks a
 * single apartment in the search UI and the application form preselects it.
 */
export const withApartmentParam = (url: string, apartmentId: number | undefined) => {
  if (!url || apartmentId === undefined) {
    return url;
  }

  const [base, existingQuery] = url.split('?');
  const params = new URLSearchParams(existingQuery);
  params.set('apartment', String(apartmentId));

  return `${base}?${params.toString()}`;
};
