import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchForm from './SearchForm';
import config from '../../mocks/filter-config.json';
import { BrowserRouter } from 'react-router-dom';

test('renders SearchForm component', () => {
  const { container } = render(
    <BrowserRouter>
      <SearchForm config={config} projectOwnershipType="hitas" />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders form submit button', () => {
  render(
    <BrowserRouter>
      <SearchForm projectOwnershipType="hitas" />
    </BrowserRouter>
  );
  expect(screen.queryAllByText('SEARCH:search')).not.toEqual([]);
});

test('renders given pagetitle', () => {
  render(
    <BrowserRouter>
      <SearchForm pageTitle={'testTitle'} projectOwnershipType="hitas" />
    </BrowserRouter>
  );
  expect(screen.queryByText('testTitle')).not.toBeNull();
});

test('renders error message', () => {
  render(
    <BrowserRouter>
      <SearchForm isError projectOwnershipType="hitas" />
    </BrowserRouter>
  );
  expect(screen.queryByText('SEARCH:filters-error-text')).not.toBeNull();
});

test('renders without an error', () => {
  render(
    <BrowserRouter>
      <SearchForm isError={false} projectOwnershipType="hitas" />
    </BrowserRouter>
  );
  expect(screen.queryByText('SEARCH:filters-error-text')).toBeNull();
});

test('loading animation is shown when isLoading is true', () => {
  render(
    <BrowserRouter>
      <SearchForm isLoading projectOwnershipType="hitas" />
    </BrowserRouter>
  );

  const elem = screen.getByLabelText('SEARCH:aria-filters-title');

  expect(elem.classList.contains('isLoading')).toBe(true);
});

test('loading animation is hidden when isLoading is false', () => {
  render(
    <BrowserRouter>
      <SearchForm isLoading={false} projectOwnershipType="hitas" />
    </BrowserRouter>
  );

  const elem = screen.getByLabelText('SEARCH:aria-filters-title');

  expect(elem.classList.contains('isLoading')).toBe(false);
});
