import { withApartmentParam } from './withApartmentParam';

test('appends the apartment query parameter to a url without a query string', () => {
  expect(withApartmentParam('https://example.com/application/add/hitas/15', 84)).toEqual(
    'https://example.com/application/add/hitas/15?apartment=84'
  );
});

test('appends the apartment query parameter to a url that already has a query string', () => {
  expect(withApartmentParam('https://example.com/application/add/hitas/15?foo=bar', 84)).toEqual(
    'https://example.com/application/add/hitas/15?foo=bar&apartment=84'
  );
});

test('replaces an existing apartment query parameter', () => {
  expect(withApartmentParam('https://example.com/application/add/hitas/15?apartment=1', 84)).toEqual(
    'https://example.com/application/add/hitas/15?apartment=84'
  );
});

test('returns the url unchanged when the apartment id is missing', () => {
  expect(withApartmentParam('https://example.com/application/add/hitas/15', undefined)).toEqual(
    'https://example.com/application/add/hitas/15'
  );
});

test('returns the url unchanged when the url is empty', () => {
  expect(withApartmentParam('', 84)).toEqual('');
});
