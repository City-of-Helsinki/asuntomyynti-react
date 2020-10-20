import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import QueryFilter from "./QueryFilter";

test('renders QueryFilter component', () => {
  const { container } = render(
    <BrowserRouter>
      <QueryFilter />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
