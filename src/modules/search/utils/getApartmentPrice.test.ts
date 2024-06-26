import { getApartmentPrice } from './getApartmentPrice';

describe('getApartmentPrice', () => {
  it("should return '-' if is haso and both release_payment is null", () => {
    const apartment = {
      debt_free_sales_price: null,
      release_payment: null,
      project_ownership_type: 'haso',
    };
    expect(getApartmentPrice(apartment)).toEqual('-');
  });

  it('should return release_payment if is haso and release_payment exists and is > 0', () => {
    const apartment = {
      haso_fee: 0,
      release_payment: 10000000,
      project_ownership_type: 'haso',
    };
    expect(getApartmentPrice(apartment)).toEqual('100\xa0000 \u20AC');
  });

  it('should return haso_fee if is haso and release_payment exists and is <= 0', () => {
    const apartment = {
      haso_fee: 10000000,
      release_payment: 0,
      project_ownership_type: 'haso',
    };
    expect(getApartmentPrice(apartment)).toEqual('100\xa0000 \u20AC');
  });

  it('should return haso_fee if is haso and release_payment does not exist', () => {
    const apartment = {
      haso_fee: 10000000,
      release_payment: null,
      project_ownership_type: 'haso',
    };
    expect(getApartmentPrice(apartment)).toEqual('100\xa0000 \u20AC');
  });

  it("should return '-' if is hitas and debt_free_sales_price does not exist", () => {
    const apartment = {
      debt_free_sales_price: null,
      project_ownership_type: 'hitas',
    };
    expect(getApartmentPrice(apartment)).toEqual('-');
  });

  it('should return debt_free_sales_price if is hitas and debt_free_sales_price exists', () => {
    const apartment = {
      debt_free_sales_price: 10000000,
      project_ownership_type: 'hitas',
    };
    expect(getApartmentPrice(apartment)).toEqual('100\xa0000 \u20AC');
  });
});
