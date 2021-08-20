import React from 'react';
import { render, screen } from '@testing-library/react';
import MapApartmentRow from './MapApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';

test('renders MapApartmentRow component', () => {
  const { container } = render(<MapApartmentRow apartment={mockApartment} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders apartment details', () => {
  render(<MapApartmentRow apartment={mockApartment} />);

  expect(screen.queryByText('A15')).not.toBeNull(); // apartment_number
  expect(screen.queryByText('1h+k+s')).not.toBeNull(); // apartment_structure
});
