import React, { useState } from 'react';
import { format } from 'date-fns';
import css from './ProjectCard.module.scss';
import ApartmentRow from './ApartmentRow';
import { IconArrowDown, IconArrowUp, IconCogwheel, IconClock } from 'hds-react';
import { Project } from '../../../types/common';
import {useTranslation} from "react-i18next";

const ProjectCard = ({ project }: { project: Project }) => {
  const { t } = useTranslation();
  const [listOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const {
    apartments,
    street_address,
    district,
    estimated_completion,
    estimated_completion_date,
    housing_company,
    main_image_url,
    publication_end_time,
  } = project;

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.imageContainer}>
          <img src={main_image_url} alt={housing_company + ' ' + t('SEARCH:project')} />
        </div>
        <div className={css.info}>
          <div className={css.details}>
            <div className={css.titles}>
              <h2 style={{ marginBottom: 5 }}>{housing_company}</h2>
              <div style={{ marginBottom: 5 }}>
                <b>{district},</b> {street_address}
              </div>
              <span className={css.label}>Hitas</span>
            </div>
            <div className={css.deadlines}>
              <div className={css.completionTime}>
                <IconCogwheel style={{ marginRight: 10 }} role="presentation" />
                {estimated_completion} {format(new Date(estimated_completion_date), 'MM/yyyy')}
              </div>
              <div className={css.applicationTime}>
                <IconClock style={{ marginRight: 10 }} role="presentation" />
                {t('SEARCH:application-open')} {format(new Date(publication_end_time), "dd.MM.yyyy 'klo' hh.mm")} {t('SEARCH:until')}
              </div>
            </div>
          </div>
          <div className={css.controls}>
            <button className={css.detailsButton}>{t('SEARCH:learn-more')}</button>
            <button className={css.apartmentListButton} onClick={toggleList}>
              {apartments.length} {t('SEARCH:apartments-available')}{' '}
              {listOpen ? (
                <IconArrowDown role="presentation" style={{ marginLeft: 10 }} />
              ) : (
                <IconArrowUp role="presentation" style={{ marginLeft: 10 }} />
              )}
            </button>
          </div>
        </div>
      </div>
      {listOpen && (
        <div className={css.apartmentList}>
          <div className={css.apartmentListTable}>
            <div className={css.apartmentListHeaders}>
              <div className={css.headerCell} style={{ flex: 2 }}>
                {t('SEARCH:apartment')}
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                {t('SEARCH:floor')}
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                {t('SEARCH:area')}
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                {t('SEARCH:free-of-debt-price')}
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                {t('SEARCH:applications')}
              </div>
              <div className={css.headerCell} style={{ flex: 3 }}></div>
            </div>
            {apartments.map(x => <ApartmentRow key={x.uuid} apartment={x} />)}
          </div>
          <div className={css.pagination}></div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
