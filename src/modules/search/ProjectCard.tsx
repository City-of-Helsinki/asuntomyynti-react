import React, { useState } from 'react';
import { format } from 'date-fns';
import css from './ProjectCard.module.scss';
import ApartmentRow from './ApartmentRow';
import { IconArrowDown, IconArrowUp, IconCogwheel, IconClock } from 'hds-react';
import { Project } from '../../types/common';

const ProjectCard = ({ project }: { project: Project }) => {
  const [listOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const {
    apartment_address,
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
          <img src={main_image_url || 'http://placekitten.com/600/400'} alt={"The project" /*TODO: Localize this*/} />
        </div>
        <div className={css.info}>
          <div className={css.details}>
            <div className={css.titles}>
              <h2 style={{ marginBottom: 5 }}>{housing_company}</h2>
              <div style={{ marginBottom: 5 }}><b>{district},</b> {apartment_address}</div>
              <span className={css.label}>Hitas</span>
            </div>
            <div className={css.deadlines}>
              <div className={css.completionTime}>
                <IconCogwheel style={{ marginRight: 10 }} role="presentation" />
                {estimated_completion} {format(new Date(estimated_completion_date), 'MM/yyyy')}
              </div>
              <div className={css.applicationTime}>
                <IconClock style={{ marginRight: 10 }} role="presentation" />
                Haku avoinna {format(new Date(publication_end_time), "dd.MM.yyyy 'klo' hh.mm")} asti
              </div>
            </div>
          </div>
          <div className={css.controls}>
            <button className={css.detailsButton}>Tutustu kohteeseen</button>
            <button className={css.apartmentListButton} onClick={toggleList}>
              78 huoneistoa haettavana{' '}
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
                Huoneisto
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                Kerros
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                Pinta-ala
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                Velaton hinta
              </div>
              <div className={css.headerCell} style={{ flex: 1 }}>
                Hakijatilanne
              </div>
              <div className={css.headerCell} style={{ flex: 3 }}></div>
            </div>
            <ApartmentRow />
          </div>
          <div className={css.pagination}></div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
