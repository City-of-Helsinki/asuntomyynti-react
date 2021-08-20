import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

import mockProject from '../../../mocks/single-project.json';

test('renders ProjectCard component', () => {
  const { container } = render(<ProjectCard project={mockProject} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders ProjectCard component with proper data', () => {
  render(<ProjectCard project={mockProject} />);

  expect(screen.getByText('Pellervontie 24')).toBeDefined();
  expect(screen.getByText('Hitas')).toBeDefined();
  expect(screen.getByText('Asunto Oy Tuleva S')).toBeDefined();
});

test('Apartment list toggle button is hidden', () => {
  render(<ProjectCard project={mockProject} hideApartments={true} />);

  expect(screen.queryByText('SEARCH:apartments-available')).toBeNull();
});

test('Apartment list toggle button is shown', () => {
  render(<ProjectCard project={mockProject} hideApartments={false} />);

  expect(screen.queryByText('1 SEARCH:apartments-available')).not.toBeNull();
});

test('Subscription form button is hidden', () => {
  render(<ProjectCard project={mockProject} showSearchAlert={false} />);

  expect(screen.queryByText('SEARCH:subscribe-for-upcoming-sales')).toBeNull();
});

test('Subscription form button is shown', () => {
  render(<ProjectCard project={mockProject} showSearchAlert={true} />);

  expect(screen.queryByText('SEARCH:subscribe-for-upcoming-sales')).not.toBeNull();
});
