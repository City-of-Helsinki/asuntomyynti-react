import { useTranslation } from 'react-i18next';
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
    }
    let { container } = render(<ApartmentRow apartment={apt} projectOwnershipIsHaso={ownership_type === 'haso'} />);
    const expectedApplicationLink = `${window.location.origin}/application/add/${ownership_type}/${mockApartment.project_id}`;    
    const applicationLink = container.querySelector(`a[href="${expectedApplicationLink}"]`);

    expect(applicationLink).toBeInTheDocument();
  });
  
  test('renders "contact us" links correctly for apartments',() => { 
      const apt = {
        ...mockApartment,
        apartment_state_of_sale: 'FREE_FOR_RESERVATIONS'
      }
      let { container } = render(<ApartmentRow apartment={apt}/>);
      const expectedContactUsLink = `${window.location.origin}/contact/apply_for_free_apartment?apartment=${mockApartment.apartment_number}&project=${mockApartment.project_id}`
      const contactUsLink = container.querySelector(`a[href="${expectedContactUsLink}"]`);
      expect(contactUsLink).toBeInTheDocument();
    });