import React from 'react';
import { render } from '@testing-library/react';
import SearchResults from "./SearchResults";

test('renders SearchResults component', () => {
    const { container } = render(
      <SearchResults searchResults={[]} />
    );
    const element = container.firstChild;
    expect(element).toBeDefined();
});
