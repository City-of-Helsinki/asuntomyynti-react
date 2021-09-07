import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

const mockSearchResults = [
  {
    id: '123',
    apartments: [],
    street_address: 'test street 1',
    district: 'kallio',
    housing_company: 'company 123',
    image_urls: '',
    main_image_url: '',
    ownership_type: 'hitas',
    url: '',
  },
];

test('renders SearchResults component', () => {
  const { container } = render(<SearchResults searchResults={[]} openMap={() => {}} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders ProjectCard list', () => {
  render(<SearchResults searchResults={mockSearchResults} openMap={() => {}} />);
  const result = screen.getByText('test street 1');
  expect(result).toBeDefined();
});

test('renders Show on map button', () => {
  render(<SearchResults searchResults={[]} openMap={() => {}} />);
  const element = screen.getByText('SEARCH:show-on-map');
  expect(element).toBeDefined();
});

test('Does not render show on map button if openMap is undefined', () => {
  render(<SearchResults searchResults={mockSearchResults} openMap={undefined} />);
  const result = screen.queryByText('SEARCH:show-on-map');
  expect(result).toBeNull();
});
