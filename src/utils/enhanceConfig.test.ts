import { enhanceConfig } from './enhanceConfig';

describe('enhanceConfig', () => {
  it('should', () => {
    const subject = enhanceConfig({});
    expect(subject).toHaveProperty('room_count');
    expect(subject.project_new_development_status).toHaveProperty('items');
    expect(subject.project_new_development_status.items).toHaveLength(0);
  });
});
