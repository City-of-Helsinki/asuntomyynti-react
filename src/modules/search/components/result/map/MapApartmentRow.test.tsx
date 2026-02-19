import { render, screen } from '@testing-library/react';
import MapApartmentRow from './MapApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';

const defaultProps = {
  apartment: mockApartment as any,
  userApplications: undefined,
  applicationStatus: undefined,
  userHasApplicationForProject: false,
  isMobileSize: false,
  projectOwnershipIsHaso: false,
};

test('renders MapApartmentRow component', () => {
  const { container } = render(<MapApartmentRow {...defaultProps} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders apartment details', () => {
  render(<MapApartmentRow {...defaultProps} />);

  expect(screen.queryByText('A15')).not.toBeNull(); // apartment_number
  expect(screen.queryByText('1h+k+s')).not.toBeNull(); // apartment_structure
});
