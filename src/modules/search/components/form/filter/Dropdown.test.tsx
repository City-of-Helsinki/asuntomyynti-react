import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Dropdown from "./Dropdown";

test('renders Dropdown component', () => {
  const { container } = render(
    <BrowserRouter>
      <Dropdown />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
