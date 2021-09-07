import React from 'react';
import { render, screen } from '@testing-library/react';
import MapProjectCard from './MapProjectCard';

import mockProject from '../../../mocks/single-project.json';

test('renders MapProjectCard component', () => {
  const { container } = render(<MapProjectCard project={mockProject} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders MapProjectCard component with actual project data', () => {
  render(<MapProjectCard project={mockProject} />);
  expect(screen.getByText('Hitas')).toBeDefined(); // ownership_type
  expect(screen.getByText('Asunto Oy Tuleva S')).toBeDefined(); // housing_company
});

// Test that it has apartments
test('MapProjectCard receives apartments', () => {
  render(<MapProjectCard project={mockProject} />);
  expect(screen.getByLabelText('SEARCH:aria-apartment-list-for-project', { exact: false })).not.toBeNull();
});
