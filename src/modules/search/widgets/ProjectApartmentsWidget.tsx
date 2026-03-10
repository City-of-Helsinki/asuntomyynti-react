import React, { useContext, useEffect, useMemo } from 'react';
import { IconAlertCircle, LoadingSpinner } from 'hds-react';
import { useTranslation } from 'react-i18next';

import { Project } from '../../../types/common';
import { DataContext } from '../DataContext';
import useSearchParams from '../../../hooks/useSearchParams';
import useSearchResults from '../../../hooks/useSearchResults';
import { getLanguageFilteredApartments } from '../utils/getLanguageFilteredApartments';
import { getProjectApplicationStatus } from '../utils/getApplicationStatus';
import {
  getUserApplications,
  userHasApplications,
  userHasReservedOrSoldApartment,
} from '../utils/userApplications';
import ApartmentTable from '../components/result/list/ApartmentTable';

import styles from './ProjectApartmentsWidget.module.scss';

type Props = {
  projectUuid: string;
  projectOwnershipType: string;
  projectStateOfSale?: string;
};

const ProjectApartmentsWidget = ({
  projectUuid,
  projectOwnershipType,
  projectStateOfSale,
}: Props) => {
  const { t, i18n } = useTranslation();
  const searchQuery = useSearchParams();
  const currentLang = searchQuery.get('lang') || 'fi';

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [currentLang, i18n]);

  const { data: config, isLoading: isConfigLoading, isError: isConfigError } =
    useContext(DataContext) || {};

  const query = useMemo(() => {
    const ownershipType = projectOwnershipType.toLowerCase();
    const localQuery: Record<string, string | string[]> = {
      project_uuid: projectUuid,
      project_ownership_type: ownershipType,
    };
    if (projectStateOfSale) {
      localQuery.project_state_of_sale = [projectStateOfSale];
    }
    return localQuery;
  }, [projectUuid, projectOwnershipType, projectStateOfSale]);

  const queryHeaders = { token: config?.token };
  const {
    data: searchResults,
    isFetching: isSearchQueryFetching,
    isError: isSearchQueryError,
  } = useSearchResults(query, queryHeaders, currentLang);

  const project = (searchResults as Project[]).find(
    (item: Project) => item.uuid === projectUuid
  );

  if (isConfigError || isSearchQueryError) {
    return (
      <div className={styles.errorToastWrapper}>
        <IconAlertCircle className={styles.alertIcon} />
        {t('SEARCH:error-while-loading-results')}
      </div>
    );
  }

  if (!config || isConfigLoading || isSearchQueryFetching) {
    return (
      <div className={styles.loadingSpinnerWrapper}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.noResults}>
        <IconAlertCircle className={styles.alertIcon} />
        {t('SEARCH:no-results')}
      </div>
    );
  }

  const filteredApartments = getLanguageFilteredApartments(
    project.apartments,
    currentLang
  );

  return (
    <section className={styles.container} aria-label={t('SEARCH:apartments')}>
      <header className={styles.header}>
        <h2>{t('SEARCH:apartments')}</h2>
        <div className={styles.resultsCount}>
          {t('SEARCH:total')} {filteredApartments.length} {t('SEARCH:apartments')}
        </div>
      </header>
      <ApartmentTable
        apartments={filteredApartments}
        applications={getUserApplications(config.user, project.id)}
        applicationStatus={getProjectApplicationStatus(
          config.apartment_application_status,
          project.id
        )}
        userHasApplicationForProject={userHasApplications(config.user, project.id)}
        userHasReservedOrSoldApartmentInProject={userHasReservedOrSoldApartment(
          config,
          project.id
        )}
        housingCompany={project.housing_company}
        projectID={project.id}
        projectOwnershipIsHaso={projectOwnershipType.toLowerCase() === 'haso'}
      />
    </section>
  );
};

export default ProjectApartmentsWidget;
