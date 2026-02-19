import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApartmentRow from './ApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';

const defaultProps = {
  apartment: mockApartment as any,
  userApplications: [],
  applicationStatus: undefined,
  userHasApplicationForProject: false,
  projectOwnershipIsHaso: false,
};

test('renders ApartmentRow component', () => {
  const { container } = render(
    <BrowserRouter>
      <ApartmentRow {...defaultProps} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders apartment details', () => {
  render(<BrowserRouter><ApartmentRow {...defaultProps} /></BrowserRouter>);

  expect(screen.queryByText('A15')).not.toBeNull(); // apartment_number
  expect(screen.queryByText('1h+k+s')).not.toBeNull(); // apartment_structure
});
