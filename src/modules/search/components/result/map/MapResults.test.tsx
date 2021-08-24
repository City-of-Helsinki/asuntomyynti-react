import React from 'react';
import { render, screen } from '@testing-library/react';
import MapResults from './MapResults';

test('renders MapResults component', () => {
  const { container } = render(<MapResults searchResults={[]} closeMap={() => {}} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders MapResults map component', () => {
  render(<MapResults searchResults={[]} openMap={() => {}} />);
  const result = screen.getByText('OpenStreetMap', { exact: false });
  expect(result).toBeDefined();
});

test('renders MapResults header', () => {
  render(<MapResults searchResults={[]} openMap={() => {}} header={'test header'} />);
  const result = screen.getByText('test header');
  expect(result).toBeDefined();
});

test('renders show as list button', () => {
  render(<MapResults searchResults={[]} openMap={() => {}} />);
  const element = screen.getByText('SEARCH:show-as-list');
  expect(element).toBeDefined();
});
