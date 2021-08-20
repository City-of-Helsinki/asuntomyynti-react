import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApartmentRow from './ApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';

test('renders ApartmentRow component', () => {
  const { container } = render(
    <BrowserRouter>
      <ApartmentRow apartment={mockApartment} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders apartment details', () => {
  render(<ApartmentRow apartment={mockApartment} />);

  expect(screen.queryByText('A15')).not.toBeNull(); // apartment_number
  expect(screen.queryByText('1h+k+s')).not.toBeNull(); // apartment_structure
});
