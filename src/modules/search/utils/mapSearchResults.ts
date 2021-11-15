const mapSearchResults = (result: any) => {
  const firstHit = result[0];
  const project: any = {};

  // Maps the Project entity
  Object.keys(firstHit).forEach((x: string) => {
    if (x.includes('project_')) {
      const key = x.split('project_')[1];
      project[key] = firstHit[x];
    }
  });

  project.apartments = result;
  return project;
};

export default mapSearchResults;
