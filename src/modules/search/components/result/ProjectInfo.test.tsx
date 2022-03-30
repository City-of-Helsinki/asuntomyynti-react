import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectInfo from './ProjectInfo';

import mockProject from '../../mocks/single-project.json';

describe('ProjectInfo', () => {
  it('renders the component', () => {
    const { container } = render(<ProjectInfo project={[]} />);
    const element = container.firstChild;
    expect(element).toBeDefined();
  });

  it('has user applications', () => {
    render(<ProjectInfo project={mockProject} userHasApplications />);
    expect(screen.getByText('SEARCH:user-application-project')).toBeDefined();
  });

  it('does not have user applications', () => {
    render(<ProjectInfo project={mockProject} userHasApplications={false} />);
    expect(screen.queryByText('SEARCH:user-application-project')).toBeNull();
  });

  it('does have estimated completion', () => {
    render(<ProjectInfo project={mockProject} />);
    expect(screen.getByText('Kesä 2021')).toBeDefined();
  });

  it('does not have estimated completion', () => {
    render(<ProjectInfo project={{ ...mockProject, estimated_completion: '' }} />);
    expect(screen.queryByText('Kesä 2021')).toBeNull();
  });

  it('does have possession transfer date', () => {
    render(<ProjectInfo project={mockProject} />);
    expect(screen.getByText('SEARCH:move-in-date', { exact: false })).toBeDefined();
  });

  it('does not have possession transfer date', () => {
    render(<ProjectInfo project={{ ...mockProject, possession_transfer_date: '' }} />);
    expect(screen.queryByText('SEARCH:move-in-date', { exact: false })).toBeNull();
  });

  it('does have upcoming description', () => {
    render(<ProjectInfo project={mockProject} />);
    expect(screen.getByText('Kohde on suunnitteilla ja tulossa hakuun')).toBeDefined();
  });

  it('does not have upcoming description', () => {
    render(<ProjectInfo project={{ ...mockProject, upcoming_description: '' }} />);
    expect(screen.queryByText('Kohde on suunnitteilla ja tulossa hakuun')).toBeNull();
  });
});
