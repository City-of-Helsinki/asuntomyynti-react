import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import IconByName from "./IconByName";

test('renders IconByName component', () => {
  const { container } = render(
    <BrowserRouter>
      <IconByName />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
