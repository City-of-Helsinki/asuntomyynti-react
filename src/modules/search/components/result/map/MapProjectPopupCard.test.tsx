import React from 'react';
import { render, screen } from '@testing-library/react';
import MapProjectPopupCard from './MapProjectPopupCard';

import mockProject from '../../../mocks/single-project.json';

test('renders MapProjectPopupCard component', () => {
  const { container } = render(<MapProjectPopupCard project={mockProject} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders MapProjectPopupCard component with actual project data', () => {
  render(<MapProjectPopupCard project={mockProject} />);
  expect(screen.getByText('Hitas')).toBeDefined(); // ownership_type
  expect(screen.getByText('Asunto Oy Tuleva S')).toBeDefined(); // housing_company
});

test('renders "show all apartments" button when hideApartments is false', () => {
  render(<MapProjectPopupCard project={mockProject} hideApartments={false} />);
  expect(screen.queryByText('SEARCH:show-all', { exact: false })).not.toBeNull();
});

test('Does not show "show all apartments" button when hideApartments is true', () => {
  render(<MapProjectPopupCard project={mockProject} hideApartments />);
  expect(screen.queryByText('SEARCH:show-all', { exact: false })).toBeNull();
});
