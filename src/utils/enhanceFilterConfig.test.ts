import { enhanceFilterConfig } from './enhanceFilterConfig';

describe('enhanceFilterConfig', () => {
  it('should', () => {
    const subject = enhanceFilterConfig({});
    expect(subject).toHaveProperty('room_count');
    expect(subject.project_new_development_status).toHaveProperty('items');
    expect(subject.project_new_development_status.items).toHaveLength(0);
  });
});
