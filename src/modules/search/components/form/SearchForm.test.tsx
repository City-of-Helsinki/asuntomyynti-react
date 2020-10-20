import React from 'react';
import { render } from '@testing-library/react';
import SearchForm from "./SearchForm";
import config from '../../mocks/filter-config.json';
import {BrowserRouter} from "react-router-dom";

test('renders SearchForm component', () => {
  const { container } = render(
    <BrowserRouter>
      <SearchForm config={config} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
