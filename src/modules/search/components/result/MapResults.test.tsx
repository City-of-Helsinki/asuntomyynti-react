import React from 'react';
import { render } from '@testing-library/react';
import MapResults from './MapResults';

test('renders MapResults component', () => {
  const { container } = render(<MapResults searchResults={[]} closeMap={() => {}} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});
