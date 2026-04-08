import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

import mockProject from '../../../mocks/single-project.json';
import mockConfig from '../../../mocks/filter-config.json';

const project = mockProject as any;
const config = mockConfig as any;

const defaultProps = {
  project,
  config,
  currentLang: 'fi',
};

test('renders ProjectCard component', () => {
  const { container } = render(<ProjectCard {...defaultProps} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders ProjectCard component with proper data', () => {
  render(<ProjectCard {...defaultProps} />);

  expect(screen.getByText('Pellervontie 24')).toBeDefined();
  expect(screen.getByText('Hitas')).toBeDefined();
  expect(screen.getByText('Asunto Oy Tuleva S')).toBeDefined();
});

test('Apartment list toggle button is hidden', () => {
  render(<ProjectCard {...defaultProps} hideApartments={true} />);

  expect(screen.queryByText('SEARCH:apartments')).toBeNull();
});

test('Apartment list toggle button is shown', () => {
  render(<ProjectCard {...defaultProps} hideApartments={false} />);

  expect(screen.queryByText('1 SEARCH:apartments')).not.toBeNull();
});
