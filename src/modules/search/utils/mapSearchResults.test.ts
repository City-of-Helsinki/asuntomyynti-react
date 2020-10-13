import mapSearchResults from './mapSearchResults';

const mockData = {
  inner_hits: {
    project_id: {
      hits: {
        total: { value: 12, relation: 'eq' },
        max_score: 0.0,
        hits: [
          {
            _index: 'elasticsearch_index_drupal_local_elasticsearch_index',
            _type: '_doc',
            _id: 'entity:node/10:fi',
            _score: 0.0,
            _source: {
              apartment_address: 'Kolkyt 30 A 6',
              project_street_address: 'Kolkyt 30',
              project_uuid: '9f79116b-898c-4fa0-80ba-c3870c624373',
              title: 'Kolkyt 30 A 6',
              uuid: 'c3145a4e-ef7d-40c5-ad93-f0a164b2704a',
            },
          },
          {
            _index: 'elasticsearch_index_drupal_local_elasticsearch_index',
            _type: '_doc',
            _id: 'entity:node/10:fi',
            _score: 0.0,
            _source: {
              apartment_address: 'Kolkyt 30 A 3',
              project_street_address: 'Kolkyt 30',
              project_uuid: '9f79116b-898c-4fa0-80ba-c3870c624373',
              title: 'Kolkyt 30 A 3',
              uuid: 'c3145a4e-ef7d-40c5-ad93-f0a164b2704a',
            },
          },
        ],
      },
    },
  },
};

const targetData = {
  street_address: 'Kolkyt 30',
  uuid: '9f79116b-898c-4fa0-80ba-c3870c624373',
  apartments: [
    {
      apartment_address: 'Kolkyt 30 A 6',
      title: 'Kolkyt 30 A 6',
      uuid: 'c3145a4e-ef7d-40c5-ad93-f0a164b2704a',
    },
    {
      apartment_address: 'Kolkyt 30 A 3',
      title: 'Kolkyt 30 A 3',
      uuid: 'c3145a4e-ef7d-40c5-ad93-f0a164b2704a',
    },
  ],
};

describe('mapSearchResults', () => {
  it('maps data properly', () => {
    const mappedData = mapSearchResults(mockData);

    expect(mappedData).toMatchObject(targetData);
  });
});
