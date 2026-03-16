import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApartmentRow from './ApartmentRow';

import mockApartment from '../../../mocks/single-apartment.json';
import statusMocks from '../../../mocks/application-status-apartments.json';

const { apartments, apartment_application_status } = statusMocks as any;

function buildPropsFor(
  nid: number,
  apartmentOverrides: Partial<React.ComponentProps<typeof ApartmentRow>['apartment']> = {},
  extraProps: Partial<React.ComponentProps<typeof ApartmentRow>> = {}
) {
  const apartment = apartments.find((a: any) => a.nid === nid);
  if (!apartment) {
    throw new Error(`No apartment with nid ${nid} in application-status-apartments.json`);
  }

  const status = apartment_application_status[String(nid)];

  return {
    apartment: { ...apartment, ...apartmentOverrides } as any,
    applicationStatus: status,
    userApplications: [],
    userHasApplicationForProject: false,
    userHasReservedOrSoldApartmentInProject: false,
    projectOwnershipIsHaso: apartment.project_ownership_type === 'haso',
    ...extraProps,
  } as React.ComponentProps<typeof ApartmentRow>;
}

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

describe('application / after-application buttons', () => {
  const inThePast = '2000-01-01T00:00:00.000Z';
  const inTheFuture = '2100-01-01T00:00:00.000Z';

  test('shows "apply" button during application period when user has no reserved/sold apartment', () => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'OPEN_FOR_APPLICATIONS',
      application_url: '',
      project_application_start_time: inThePast,
      project_application_end_time: inTheFuture,
      can_apply_afterwards: false,
      project_can_apply_afterwards: false,
    };

    render(<ApartmentRow apartment={apt} projectOwnershipIsHaso={false} />);

    expect(screen.getByText('SEARCH:apply')).toBeInTheDocument();
  });

  test('shows "after-apply" button when can_apply_afterwards is true outside application period', () => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'OPEN_FOR_APPLICATIONS',
      application_url: '',
      // Application window in the past -> not active now
      project_application_start_time: inThePast,
      project_application_end_time: inThePast,
      can_apply_afterwards: true,
      project_can_apply_afterwards: true,
    };

    render(<ApartmentRow apartment={apt} projectOwnershipIsHaso={true} />);

    expect(screen.getByText('SEARCH:after-apply')).toBeInTheDocument();
  });

  test('does not show apply/after-apply button when user has reserved or sold apartment in project', () => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'OPEN_FOR_APPLICATIONS',
      application_url: '',
      project_application_start_time: inThePast,
      project_application_end_time: inTheFuture,
      can_apply_afterwards: false,
      project_can_apply_afterwards: false,
    };

    render(
      <ApartmentRow
        apartment={apt}
        projectOwnershipIsHaso={false}
        userHasReservedOrSoldApartmentInProject={true}
      />
    );

    expect(screen.queryByText('SEARCH:apply')).toBeNull();
    expect(screen.queryByText('SEARCH:after-apply')).toBeNull();
  });

  test('does not show apply/after-apply button when outside application period, not free, and cannot apply afterwards', () => {
    const apt = {
      ...mockApartment,
      apartment_state_of_sale: 'SOME_OTHER_STATE',
      application_url: '',
      // Window entirely in the past; not free; cannot apply afterwards
      project_application_start_time: inThePast,
      project_application_end_time: inThePast,
      can_apply_afterwards: false,
      project_can_apply_afterwards: false,
    };

    render(<ApartmentRow apartment={apt} projectOwnershipIsHaso={false} />);

    expect(screen.queryByText('SEARCH:apply')).toBeNull();
    expect(screen.queryByText('SEARCH:after-apply')).toBeNull();
  });
});

test('renders "contact us" links correctly for apartments', () => {
  const apt = {
    ...mockApartment,
    apartment_state_of_sale: 'FREE_FOR_RESERVATIONS',
  };
  const { container } = render(<ApartmentRow apartment={apt} />);
  const expectedContactUsLink = `${window.location.origin}/contact/apply_for_free_apartment?apartment=${mockApartment.apartment_number}&project=${mockApartment.project_id}`;

  const contactUsLink = container.querySelector(`a[href="${expectedContactUsLink}"]`);
  expect(contactUsLink).toBeInTheDocument();
});

describe('ApartmentRow customer-facing status outside application period', () => {
  test('shows "free" for a vacant apartment', () => {
    const props = buildPropsFor(101, {
      project_application_start_time: '2100-01-01T00:00:00+02:00',
      project_application_end_time: '2100-01-10T00:00:00+02:00',
    });

    render(<ApartmentRow {...props} />);

    expect(screen.getByText('SEARCH:apartment-free')).toBeInTheDocument();
    expect(
      screen.queryByText('SEARCH:apartment-few-applications')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('SEARCH:apartment-some-applications')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('SEARCH:apartment-lots-of-applications')
    ).not.toBeInTheDocument();
  });

  test.each([102, 103])(
    'shows "reserved" for reserved apartment (nid=%s)',
    (nid) => {
      const props = buildPropsFor(nid, {
        project_application_start_time: '2100-01-01T00:00:00+02:00',
        project_application_end_time: '2100-01-10T00:00:00+02:00',
      });

      render(<ApartmentRow {...props} />);

      expect(screen.getByText('SEARCH:apartment-reserved')).toBeInTheDocument();
      expect(
        screen.queryByText('SEARCH:apartment-few-applications')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('SEARCH:apartment-some-applications')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('SEARCH:apartment-lots-of-applications')
      ).not.toBeInTheDocument();
    }
  );
});

describe('ApartmentRow status during application period (few/many applicants)', () => {
  const inThePast = '2000-01-01T00:00:00.000Z';
  const inTheFuture = '2100-01-01T00:00:00.000Z';

  test('LOW → "few applications" during application period', () => {
    const props = buildPropsFor(105, {
      project_application_start_time: inThePast,
      project_application_end_time: inTheFuture,
    });

    render(<ApartmentRow {...props} />);

    expect(
      screen.getByText('SEARCH:apartment-few-applications')
    ).toBeInTheDocument();
  });

  test('MEDIUM → "some applications" during application period', () => {
    const props = buildPropsFor(106, {
      project_application_start_time: inThePast,
      project_application_end_time: inTheFuture,
    });

    render(<ApartmentRow {...props} />);

    expect(
      screen.getByText('SEARCH:apartment-some-applications')
    ).toBeInTheDocument();
  });

  test('HIGH → "lots of applications" during application period', () => {
    const props = buildPropsFor(107, {
      project_application_start_time: inThePast,
      project_application_end_time: inTheFuture,
    });

    render(<ApartmentRow {...props} />);

    expect(
      screen.getByText('SEARCH:apartment-lots-of-applications')
    ).toBeInTheDocument();
  });
});