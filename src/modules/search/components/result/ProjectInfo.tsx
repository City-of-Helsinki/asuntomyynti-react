import React from 'react';
import { IconCogwheel, IconClock, IconPenLine } from 'hds-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Project } from '../../../../types/common';
import css from './ProjectInfo.module.scss';

type Props = {
  project: Project;
  userHasApplications: boolean;
};

const ProjectInfo = ({ project, userHasApplications }: Props) => {
  const { t } = useTranslation();
  const { estimated_completion, estimated_completion_date, publication_end_time, possession_transfer_date } = project;

  return (
    <div className={css.deadlines}>
      {estimated_completion_date && (
        <div className={css.completionTime}>
          <IconCogwheel style={{ marginRight: 10 }} aria-hidden="true" />
          <span>
            {estimated_completion} {format(new Date(estimated_completion_date), 'MM/yyyy')}
          </span>
        </div>
      )}
      {publication_end_time && (
        <div className={css.applicationTime}>
          <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
          <span>
            {t('SEARCH:application-open')} {format(new Date(publication_end_time), "dd.MM.yyyy 'klo' hh.mm")}{' '}
            {t('SEARCH:until')}
          </span>
        </div>
      )}
      {userHasApplications && (
        <>
          <div className={css.applicationSent}>
            <IconPenLine style={{ marginRight: 10 }} aria-hidden="true" />
            <span>{t('SEARCH:user-application-project')}</span>
          </div>
          {possession_transfer_date && (
            <div className={css.moveInTime}>
              <IconClock style={{ marginRight: 10 }} aria-hidden="true" />
              <span>
                {t('SEARCH:move-in-date')} {format(new Date(possession_transfer_date), "dd.MM.yyyy 'klo' hh.mm")}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectInfo;
