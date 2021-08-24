import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SubscriptionForm from './SubscriptionForm';

test('renders SubscriptionForm component', () => {
  const { container } = render(
    <BrowserRouter>
      <SubscriptionForm project={{}} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders form inputs', () => {
  render(
    <BrowserRouter>
      <SubscriptionForm project={{}} />
    </BrowserRouter>
  );

  expect(screen.queryByText('SEARCH:email')).not.toBeNull();
  expect(screen.queryByText('SEARCH:subscribe-to-newsletter')).not.toBeNull();
  expect(screen.queryByText('SEARCH:cancel')).not.toBeNull();
});
