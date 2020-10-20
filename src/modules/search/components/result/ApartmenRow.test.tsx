import React from 'react';
import { render } from '@testing-library/react';
import ApartmentRow from "./ApartmentRow";

test('renders ApartmentRow component', () => {
  const { container } = render(<ApartmentRow apartment={{}} />);
  const element = container.firstChild;
  expect(element).toBeDefined();
});
