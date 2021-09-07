import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApartmentTable from './ApartmentTable';

import mockApartment from '../../../mocks/single-apartment.json';

test('renders ApartmentTable component', () => {
  const { container } = render(
    <BrowserRouter>
      <ApartmentTable apartments={[mockApartment]} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders table header elements', () => {
  render(<ApartmentTable apartments={[mockApartment]} />);
  expect(screen.getAllByText('SEARCH:apartment')).toBeDefined();
  expect(screen.getAllByText('SEARCH:floor')).toBeDefined();
  expect(screen.getAllByText('SEARCH:area')).toBeDefined();
  expect(screen.getAllByText('SEARCH:free-of-debt-price')).toBeDefined();
  expect(screen.getAllByText('SEARCH:applications')).toBeDefined();
});

test('Dont render pagination', () => {
  render(<ApartmentTable apartments={[mockApartment]} />);
  expect(screen.queryByLabelText('SEARCH:previous-page')).toBeNull();
});

test('Renders pagination', () => {
  const multipleApartments = new Array(15);

  for (let i = 0; i < multipleApartments.length; i++) {
    multipleApartments[i] = { ...mockApartment, uuid: Math.random().toString(36).substr(2, 5) };
  }

  render(<ApartmentTable apartments={multipleApartments} />);
  expect(screen.queryByLabelText('SEARCH:previous-page')).not.toBeNull();
});
