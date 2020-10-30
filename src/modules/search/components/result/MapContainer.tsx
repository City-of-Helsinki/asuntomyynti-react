import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import css from './MapContainer.module.scss';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { Map, TileLayer, Marker, LatLng } from 'react-leaflet';
import { IconClock, IconCogwheel, IconLocation } from 'hds-react';
import L from 'leaflet';
import { format } from 'date-fns';
import ProjectCard from "./ProjectCard";

type Props = {
  searchResults: Project[];
};

const MAP_URL = 'https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png';

const MapContainer = ({ searchResults }: Props) => {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);

  const handleMarkerClick = (targetProject: Project) => {
    setActiveProject(targetProject);
  };

  const icon = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<IconLocation size={'l'} color={'#626578'} />),
  });

  return (
    <div className={css.container}>
      <div id={'mapid'}>
        <Map
          center={[60.2, 24.92]}
          zoom={13}
          maxBounds={[
            [59.4, 23.8],
            [61.5, 25.8],
          ]}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={MAP_URL}
          />
          {searchResults.map((x) => (
            <Marker key={x.uuid} icon={icon} position={[60.2, 24.92]} onClick={() => handleMarkerClick(x)} />
          ))}
        </Map>
        {activeProject && <ProjectCard project={activeProject} hideImgOnSmallScreen={true} />}
      </div>
    </div>
  );
};

export default MapContainer;

/*const ProjectDetails = ({ activeProject }: { activeProject: Project }) => {
  const { t } = useTranslation();
  const {
    main_image_url,
    housing_company,
    district,
    street_address,
    ownership_type,
    estimated_completion,
    estimated_completion_date,
    publication_end_time,
  } = activeProject;
  return (
    <div style={{ display: 'flex' }}>
      <img src={main_image_url} height="200" width="200" />
      <div style={{ padding: '0 15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className={css.titles}>
            <h2 style={{ marginBottom: 5, textAlign: 'left' }}>{housing_company}</h2>
            <div style={{ marginBottom: 5 }}>
              <b>{district},</b> {street_address}
            </div>
            <span className={css.label}>{ownership_type}</span>
          </div>
          <div className={css.deadlines}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconCogwheel style={{ marginRight: 10 }} role="presentation" />
              {estimated_completion} {format(new Date(estimated_completion_date), 'MM/yyyy')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconClock style={{ marginRight: 10 }} role="presentation" />
              {t('SEARCH:application-open')} {format(new Date(publication_end_time), "dd.MM.yyyy 'klo' hh.mm")}{' '}
              {t('SEARCH:until')}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>Sami</div>
      </div>
    </div>
  );
};*/
