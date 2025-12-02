import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApartmentRow from './ApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';

test('renders ApartmentRow component', () => {
  const { container } = render(
    <BrowserRouter>
      <ApartmentRow apartment={mockApartment} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});

test('renders apartment details', () => {
  render(<ApartmentRow apartment={mockApartment} />);

  expect(screen.queryByText('A15')).not.toBeNull(); // apartment_number
  expect(screen.queryByText('1h+k+s')).not.toBeNull(); // apartment_structure
});

test.each<string>(['haso', 'hitas'])(
  'renders application links correctly for %s apartments',
  (ownership_type) => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'OPEN_FOR_APPLICATIONS',
      application_url: '',
    }
    let { container } = render(<ApartmentRow apartment={apt} projectOwnershipIsHaso={ownership_type === 'haso'} />);
    const expectedApplicationLink = `${window.location.origin}/application/add/${ownership_type}/${mockApartment.project_id}`;

    const applicationLink = container.querySelector(`a[href="${expectedApplicationLink}"]`);
    
    expect(applicationLink).toBeInTheDocument();
  });


  test.each<[string, string,boolean, string, boolean]>([
      ['haso', 'OPEN_FOR_APPLICATIONS',true, 'SEARCH:after-apply', true],
      ['haso', 'OPEN_FOR_APPLICATIONS',false, 'SEARCH:apply', true],
      ['haso', 'FREE_FOR_RESERVATIONS',false, 'SEARCH:apply', false],
      ['hitas','OPEN_FOR_APPLICATIONS', false, 'SEARCH:apply', true],
    ]
  )(
  'renders after-application links correctly',
  (
    ownership_type,
    apartment_state_of_sale,
    project_can_apply_afterwards,
    expected_text,
    expected_to_have_apply_link
  ) => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: apartment_state_of_sale,
      application_url: '',
      project_application_end_time: '2025-08-31T12:00:00+03:00',
      project_can_apply_afterwards: project_can_apply_afterwards,
    }
    let { container } = render(<ApartmentRow apartment={apt} projectOwnershipIsHaso={ownership_type === 'haso'} />);
    
    if (expected_to_have_apply_link) {
      expect(screen.queryByText(expected_text)).not.toBeNull();
    }
    else {
      expect(screen.queryByText(expected_text)).toBeNull();
    }
  });


  test('renders "contact us" links correctly for apartments', () => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'FREE_FOR_RESERVATIONS'
    }
    let { container } = render(<ApartmentRow apartment={apt} />);
    const expectedContactUsLink = `${window.location.origin}/contact/apply_for_free_apartment?apartment=${mockApartment.apartment_number}&project=${mockApartment.project_id}`

    const contactUsLink = container.querySelector(`a[href="${expectedContactUsLink}"]`);
  expect(contactUsLink).toBeInTheDocument();
});