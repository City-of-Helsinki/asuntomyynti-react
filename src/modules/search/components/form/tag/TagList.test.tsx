import { render } from '@testing-library/react';
import TagList from "./TagList";
import {BrowserRouter} from "react-router-dom";
import { FilterName } from '../../../../../types/common';

const mockFilters = {
  [FilterName.Price]: { label: 'Price', items: [], suffix: 'Eur' },
  [FilterName.LivingArea]: { label: 'Living Area', items: ['Min', 'Max'], suffix: 'm2' },
  [FilterName.ProjectBuildingType]: { label: 'Building Type', items: [], suffix: null },
  [FilterName.ProjectDistrictHaso]: { label: 'District', items: [], suffix: null },
  [FilterName.ProjectDistrictHitas]: { label: 'District', items: [], suffix: null },
  [FilterName.ProjectDistrict]: { label: 'District', items: [], suffix: null },
  [FilterName.Properties]: { label: 'Properties', items: [], suffix: null },
  [FilterName.RoomCount]: { label: 'Rooms', items: [], suffix: null },
  [FilterName.StateOfSale]: { label: 'State', items: [], suffix: null },
} as any;

test('renders TagList component', () => {
  const { container } = render(
    <BrowserRouter>
      <TagList filters={mockFilters} />
    </BrowserRouter>
  );
  const element = container.firstChild;
  expect(element).toBeDefined();
});
