import { UserConfig } from '../../../types/common';

export const userHasApplications = (user: UserConfig | undefined, id: number) => {
  if (!user) {
    return false;
  }
  const hasApplications = id in user.applications;
  return hasApplications;
};

export const getUserApplications = (user: UserConfig | undefined, id: number) => {
  if (!user) {
    return undefined;
  }
  const applicationsById = user.applications[id];
  return applicationsById;
};

export const userHasApplicationForApartment = (applications: number[] | undefined, id: number) => {
  if (!applications) {
    return false;
  }
  return applications.includes(id);
};
