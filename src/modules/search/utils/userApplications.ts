import { ApplicationStatus, DataConfig, UserConfig } from '../../../types/common';

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

export const userHasReservedOrSoldApartment = (data: DataConfig|undefined, projectId: number): boolean => {
  if(!data) return false;
  
  const user = data.user;
  if(!data.apartment_application_status) return false
  if(!user || !user.applications || !user.application_project_pairs) {
    return false
  }
  const projectApplication = user.application_project_pairs.find(
    x => x.project_id === projectId
  );
  
  if (!projectApplication) return false
  const applicationId = projectApplication.application_id;
  
  const application_status = data.apartment_application_status[projectId][applicationId];
  const reservedOrSoldStatuses = [
    ApplicationStatus.Sold.valueOf(),
    ApplicationStatus.Reserved.valueOf(),
    ApplicationStatus.ReservedHaso.valueOf(),
  ]
  return reservedOrSoldStatuses.indexOf(application_status) !== -1
}