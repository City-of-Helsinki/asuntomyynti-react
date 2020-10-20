import React from 'react';
import { render } from '@testing-library/react';
import ProjectCard from './ProjectCard';

test('renders ProjectCard component', () => {
  const { container } = render(
    <ProjectCard
      project={{ apartments: [], estimated_completion_date: '2020-12-24', publication_end_time: '2020-12-24' }}
    />
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
