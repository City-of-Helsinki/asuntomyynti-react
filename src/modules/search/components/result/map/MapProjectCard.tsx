import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataConfig, Project } from '../../../../../types/common';
import { getLanguageFilteredApartments } from '../../../utils/getLanguageFilteredApartments';
import { getProjectApplicationStatus, getApartmentApplicationStatus } from '../../../utils/getApplicationStatus';
import { userHasApplications, getUserApplications } from '../../../utils/userApplications';
import { fullURL } from '../../../utils/fullURL';
import SortApartments from '../../../utils/sortApartments';
import MapApartmentRow from './MapApartmentRow';
import ProjectInfo from '../ProjectInfo';

import css from './MapProjectCard.module.scss';

type Props = {
  config: DataConfig | undefined;
  project: Project;
  currentLang: string;
};

const MapProjectCard = ({ config, project, currentLang }: Props) => {
  const { t } = useTranslation();
  const [topPosition, setTopPosition] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const topPositionRef = useRef<HTMLDivElement>(null);
  const BREAK_POINT = 769;
  const isMobileSize = width < BREAK_POINT;

  const handleOnResize = () => {
    setWidth(window.innerWidth);

    if (topPositionRef.current) {
      setTopPosition(topPositionRef.current.clientHeight);
    }
  };

  // Add listener for resize event
  useEffect(() => {
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  useEffect(() => {
    if (topPositionRef.current) {
      setTopPosition(topPositionRef.current.clientHeight);
    }
  }, [project]); // Update position when project changes

  const { apartment_application_status, user } = config || {};

  const { apartments, street_address, district, housing_company, main_image_url, id, ownership_type, url } = project;
  const { items } = SortApartments(apartments);

  const filteredApartments = getLanguageFilteredApartments(items, currentLang);
  const hasApartments = !!filteredApartments.length;

  const projectApplicationStatus = getProjectApplicationStatus(apartment_application_status, id);
  const projectUserApplications = getUserApplications(user, id);

  const renderBasicDetails = () => (
    <div className={css.mapProjectDetailsContent}>
      {main_image_url && (
        <div className={css.mapProjectDetailImage}>
          <img src={fullURL(main_image_url)} alt={`${housing_company}, ${t('SEARCH:project-main-image')}`} />
        </div>
      )}
      <div className={css.mapProjectDetailText}>
        <h3>{housing_company}</h3>
        <p>
          <b>{district},</b> {street_address}
        </p>
        <span className={css.label}>{ownership_type}</span>
      </div>
    </div>
  );

  return (
    <>
      <div className={css.mapProjectDetailWrap} ref={topPositionRef}>
        <div className={css.mapProjectDetails}>
          {url ? <a href={fullURL(url)}>{renderBasicDetails()}</a> : renderBasicDetails()}
        </div>
        <ProjectInfo project={project} userHasApplications={userHasApplications(user, id)} dense />
      </div>
      {hasApartments && (
        <div className={css.mapApartments} style={{ top: topPosition }}>
          {filteredApartments.map((x) => (
            <MapApartmentRow
              key={x.uuid}
              apartment={x}
              userApplications={projectUserApplications}
              applicationStatus={getApartmentApplicationStatus(projectApplicationStatus, x.nid)}
              isMobileSize={isMobileSize}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MapProjectCard;
