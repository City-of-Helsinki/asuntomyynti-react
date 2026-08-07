import { render, screen } from '@testing-library/react';
import MapApartmentRow from './MapApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';

const defaultProps = {
  apartment: mockApartment as any,
  userApplications: undefined,
  applicationStatus: undefined,
  userHasApplicationForProject: false,
  userHasReservedOrSoldApartmentInProject: false,
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

test('does not show "free" when application status is RESERVED for free_for_reservations apartment', () => {
  const apartment = {
    ...mockApartment,
    apartment_state_of_sale: 'FREE_FOR_RESERVATIONS',
    project_application_start_time: '2100-01-01T00:00:00+02:00',
    project_application_end_time: '2100-01-10T00:00:00+02:00',
  };

  render(<MapApartmentRow {...defaultProps} apartment={apartment} applicationStatus="RESERVED" />);

  expect(screen.getByText('SEARCH:apartment-reserved')).toBeInTheDocument();
  expect(screen.queryByText('SEARCH:apartment-free')).not.toBeInTheDocument();
});

test('does not show "free" when application status is SOLD for free_for_reservations apartment', () => {
  const apartment = {
    ...mockApartment,
    apartment_state_of_sale: 'FREE_FOR_RESERVATIONS',
    project_application_start_time: '2100-01-01T00:00:00+02:00',
    project_application_end_time: '2100-01-10T00:00:00+02:00',
  };

  render(<MapApartmentRow {...defaultProps} apartment={apartment} applicationStatus="SOLD" />);

  expect(screen.getByText('SEARCH:apartment-sold')).toBeInTheDocument();
  expect(screen.queryByText('SEARCH:apartment-free')).not.toBeInTheDocument();
});
