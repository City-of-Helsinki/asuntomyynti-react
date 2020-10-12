export const mapSearchResults = (result: any) => {
  const hits = result.inner_hits.project_id.hits.hits;
  const firstHit = hits[0]._source;

  const project: any = {};

  // Maps the Project entity
  Object.keys(firstHit).forEach((x: string) => {
    if (x.includes('project_')) {
      const key = x.split('project_')[1];
      project[key] = firstHit[x];
    }
  });

  project.apartments = hits.map((x: any) => x._source);
  return project;
};
