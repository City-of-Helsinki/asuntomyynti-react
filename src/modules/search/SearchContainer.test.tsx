import React from 'react';
import { render } from '@testing-library/react';
import SearchContainer from './SearchContainer';
import axios from 'axios';
import searchResponse from './mocks/search-response.json';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders Search component', () => {
  mockedAxios.post.mockResolvedValue({ data: searchResponse });

  const { container } = render(
    <BrowserRouter>
      <SearchContainer />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
