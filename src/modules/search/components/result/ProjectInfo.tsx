import React from 'react';
import cx from 'classnames';
import { IconCogwheel, IconClock, IconPenLine, IconInfoCircle } from 'hds-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Project, StateOfSale } from '../../../../types/common';
import css from './ProjectInfo.module.scss';

type Props = {
  project: Project;
  userHasApplications: boolean;
  dense?: boolean;
};

const ProjectInfo = ({ project, userHasApplications, dense = false }: Props) => {
  const { t } = useTranslation();
  const {
    application_end_time,
    application_start_time,
    estimated_completion,
    possession_transfer_date,
    state_of_sale,
    upcoming_description,
  } = project;

  const renderApplicationPeriodText = () => {
    const applicationPeriodHasStarted = new Date().getTime() > new Date(application_start_time).getTime();
    const applicationPeriodHasEnded = new Date().getTime() > new Date(application_end_time).getTime();

    // Show when the application period starts
    if (!applicationPeriodHasStarted) {
      return `${t('SEARCH:application-period-starts')} ${format(
        new Date(application_start_time),
        'dd.MM.yyyy, hh:mm'
      )}`;
    }

    // Show when the application period has ended
    if (applicationPeriodHasEnded) {
      return `${t('SEARCH:application-period-ended')} ${format(new Date(application_end_time), 'dd.MM.yyyy, HH:mm')}`;
    }

    // Show when the currently active application period ends
    return `${t('SEARCH:application-period-ends')} ${format(new Date(application_end_time), 'dd.MM.yyyy, HH:mm')}`;
  };

  return (
    <div className={css.deadlines}>
      {estimated_completion && (
        <div className={dense ? cx(css.completionTime, css.dense) : css.completionTime}>
          <IconCogwheel style={{ marginRight: 10 }} aria-hidden="true" />
          <span>{estimated_completion}</span>
        </div>
      )}
      {application_start_time && application_end_time && (
        <div className={dense ? cx(css.applicationTime, css.dense) : css.applicationTime}>
          <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
          <span>{renderApplicationPeriodText()}</span>
        </div>
      )}
      {userHasApplications && (
        <>
          <div className={dense ? cx(css.applicationSent, css.dense) : css.applicationSent}>
            <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
            <span>{t('SEARCH:user-application-project')}</span>
          </div>
        </>
      )}
      {possession_transfer_date && (
        <div className={dense ? cx(css.moveInTime, css.dense) : css.moveInTime}>
          <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
          <span>
            {t('SEARCH:move-in-date')} {format(new Date(possession_transfer_date), 'dd.MM.yyyy')}
          </span>
        </div>
      )}
      {state_of_sale === StateOfSale.Upcoming && !!upcoming_description && (
        <div className={dense ? cx(css.upcomingDescription, css.dense) : css.upcomingDescription}>
          <IconInfoCircle style={{ marginRight: 10 }} aria-hidden="true" />
          <span>{upcoming_description}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectInfo;
