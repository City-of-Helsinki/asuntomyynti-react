import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import css from './MapContainer.module.scss';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { IconLocation } from 'hds-react';
import L from 'leaflet';
import ProjectCard from './ProjectCard';

type Props = {
  searchResults: Project[];
};

const MAP_URL = 'https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png';

const Map = ({ searchResults }: Props) => {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);

  const handleMarkerClick = (targetProject: Project) => {
    setActiveProject(targetProject);
  };

  const getMarkerIcon = (project: Project) => {
    const blue = '#0000bf';
    const isActive = project.uuid === activeProject?.uuid;

    const element = (
      <div
        style={{
          marginLeft: -14,
          marginTop: -14,
          width: 40,
          height: 40,
          backgroundColor: isActive ? blue : 'white',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconLocation size={'m'} color={isActive ? 'white' : blue} />
      </div>
    );

    /*if (project.building_type === 'hitas') {

    }*/
    const icon = L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(element),
    });

    return icon;
  };

  console.log(searchResults);

  return (
    <div className={css.container}>
      <div id={'mapid'}>
        <MapContainer
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
            <Marker
              key={x.uuid}
              icon={getMarkerIcon(x)}
              position={[x.coordinate_lat, x.coordinate_lon]}
              eventHandlers={{ click: () => handleMarkerClick(x) }}
            />
          ))}
        </MapContainer>
        {activeProject && <ProjectCard project={activeProject} hideImgOnSmallScreen={true} />}
      </div>
    </div>
  );
};

export default Map;
