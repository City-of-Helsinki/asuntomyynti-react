import { Apartment } from '../../../types/common';
import formattedPrice from './formatPrice';

export const getApartmentPrice = (apartment: Apartment): string => {
  if (!apartment) return '-';

  const { haso_fee, debt_free_sales_price, release_payment, project_ownership_type } = apartment;

  if (project_ownership_type.toLowerCase() === 'haso') {
    if (release_payment && release_payment > 0) {
      return formattedPrice(release_payment);
    }
    if (haso_fee && haso_fee > 0) {
      return formattedPrice(haso_fee);
    }
    return '-';
  }

  return debt_free_sales_price ? formattedPrice(debt_free_sales_price) : '-';
};
