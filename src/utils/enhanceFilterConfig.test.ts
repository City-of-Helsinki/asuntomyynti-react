import { enhanceFilterConfig } from './enhanceFilterConfig';

describe('enhanceFilterConfig', () => {
  it('should', () => {
    const subject = enhanceFilterConfig({});
    expect(subject).toHaveProperty('room_count');
    expect(subject.project_state_of_sale).toHaveProperty('items');
    expect(subject.project_state_of_sale.items).toHaveLength(0);
  });
});
