import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoBlock from './InfoBlock';

import mockConfig from '../../modules/search/mocks/filter-config.json';

test('renders InfoBlock for haso', () => {
  render(<InfoBlock config={mockConfig} type={'haso'} />);

  expect(
    screen.getByText(
      'How applying for haso apartments works ? What is required from the applicant ? Read our buyers guide for haso apartments before proceeding with the application.'
    )
  ).toBeDefined();
});

test('renders InfoBlock for hitas', () => {
  render(<InfoBlock config={mockConfig} type={'hitas'} />);

  expect(
    screen.getByText(
      'Miten Hitas-haku etenee? Olemme koonneet tietoa Hitas-asunnoista omalle sivulleen. Tutustuthan siihen ennen kuin jätät hakemuksen.'
    )
  ).toBeDefined();
});
