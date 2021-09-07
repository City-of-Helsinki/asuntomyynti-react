import React from 'react';
import { render } from '@testing-library/react';
import TagList from "./TagList";
import {BrowserRouter} from "react-router-dom";

test('renders TagList component', () => {
  const { container } = render(
    <BrowserRouter>
      <TagList />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
