import React from 'react';
import { render } from '@testing-library/react';
import SearchContainer from './SearchContainer';

test('renders Search component', () => {
  const { container } = render(<SearchContainer />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});
