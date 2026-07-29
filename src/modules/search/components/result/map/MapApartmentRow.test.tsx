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

describe('"Tee varaus" (make reservation) button', () => {
  const inThePast = '2000-01-01T00:00:00.000Z';

  test('links to the application form with the apartment preselected', () => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'FREE_FOR_RESERVATIONS',
      application_url: '',
      project_application_start_time: inThePast,
      project_application_end_time: inThePast,
      project_can_apply_afterwards: true,
      can_apply_afterwards: true,
    };

    const { container } = render(
      <MapApartmentRow {...defaultProps} apartment={apt} projectOwnershipIsHaso={false} />
    );

    const expectedUrl = `${window.location.origin}/application/add/hitas/${mockApartment.project_id}?apartment=${mockApartment.nid}`;
    expect(container.querySelector(`a[href="${expectedUrl}"]`)).toBeInTheDocument();
  });
});
