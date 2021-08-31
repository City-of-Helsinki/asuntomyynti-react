import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SubscribeToProjectMailinglist from './SubscribeToProjectMailinglist';

import mockConfig from '../../mocks/filter-config.json';
import mockProject from '../../mocks/single-project.json';

const mockUserConfig = {
  user_id: '123',
  email_address: null,
  username: '',
  applications: [],
};

const mockUserConfigWithSubscriptions = {
  user_id: '123',
  email_address: null,
  username: '',
  applications: [],
  followed_projects: [99],
};

test('renders SubscribeToProjectMailinglist component', () => {
  const { container } = render(
    <BrowserRouter>
      <SubscribeToProjectMailinglist project={mockProject} config={mockConfig} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders unsubscribe button when user is already following the project', () => {
  render(
    <BrowserRouter>
      <SubscribeToProjectMailinglist
        project={{ ...mockProject, id: 99 }}
        config={{ ...mockConfig, user: mockUserConfigWithSubscriptions }}
      />
    </BrowserRouter>
  );
  expect(screen.getByText('SEARCH:project-mailinglist-unsubscribe', { exact: false }));
});

test('renders subscribe button when user does not already follow the project', () => {
  render(
    <BrowserRouter>
      <SubscribeToProjectMailinglist
        project={{ ...mockProject, id: 10 }}
        config={{ ...mockConfig, user: mockUserConfig }}
      />
    </BrowserRouter>
  );
  expect(screen.getByText('SEARCH:project-mailinglist-subscribe', { exact: false }));
});
