import React from 'react';
import { render } from '@testing-library/react';
import CheckList from "./CheckList";
import {BrowserRouter} from "react-router-dom";

test('renders CheckList component', () => {
  const { container } = render(
    <BrowserRouter>
      <CheckList items={[]} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
