import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import css from './MapResults.module.scss';
import { Project, StateOfSale } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Button, IconLocation, IconMenuHamburger } from 'hds-react';
import L from 'leaflet';
import ProjectCard from './ProjectCard';

type Props = {
  searchResults: Project[];
  closeMap: () => void;
  currentLang: string;
};

const MAP_TILES_URL =
  process.env.REACT_APP_MAP_TILES_URL || 'https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png';

const MapResults = ({ searchResults, closeMap, currentLang }: Props) => {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);

  const handleMarkerClick = (targetProject: Project) => {
    setActiveProject(targetProject);
  };

  const getMarkerColor = (state?: StateOfSale) => {
    switch (state) {
      case StateOfSale.PreMarketing:
        return '#000000';
      case StateOfSale.ForSale:
        return '#0000bf';
      default:
        return '#0000bf';
    }
  };

  const getMarkerIcon = (project: Project) => {
    const color = getMarkerColor(project.state_of_sale);
    const isActive = project.uuid === activeProject?.uuid;

    const element = (
      <div
        style={{
          marginLeft: -14,
          marginTop: -14,
          width: 40,
          height: 40,
          backgroundColor: isActive ? color : 'white',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconLocation size={'m'} color={isActive ? 'white' : color} />
      </div>
    );

    const icon = L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(element),
    });

    return icon;
  };

  // Centers the map to middle of all the projects on initial render
  const getInitialPosition = (): [number, number] => {
    if (searchResults.length > 0) {
      let maxLon: number = searchResults[0].coordinate_lon;
      let minLon: number = searchResults[0].coordinate_lon;
      let maxLat: number = searchResults[0].coordinate_lat;
      let minLat: number = searchResults[0].coordinate_lat;

      searchResults.forEach((x) => {
        const { coordinate_lon, coordinate_lat } = x;
        if (maxLon < coordinate_lon) {
          maxLon = coordinate_lon;
        }
        if (!minLon || minLon > coordinate_lon) {
          minLon = coordinate_lon;
        }
        if (!maxLat || maxLat < coordinate_lat) {
          maxLat = coordinate_lat;
        }
        if (!maxLat || maxLat < coordinate_lat) {
          minLat = coordinate_lat;
        }
      });

      const lon = (maxLon - minLon) / 2 + minLon;
      const lat = (maxLat - minLat) / 2 + minLat;

      return [lat, lon];
    }

    return [60.17, 24.94];
  };

  return (
    <div className={css.container}>
      <header>
        <div className={css.titleContainer}>
          <h2>{t('SEARCH:all-apartments')}</h2>
          <div className={css.resultsCount}>
            {t('SEARCH:total')} {searchResults.length} {t('SEARCH:apartments')}
          </div>
        </div>
        <div>
          <Button className={css.showButton} variant="secondary" onClick={closeMap}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconMenuHamburger style={{ marginRight: 20 }} /> {t('SEARCH:show-as-list')}
            </div>
          </Button>
        </div>
      </header>
      <div className={css.mapContainer}>
        <div id={'asuReactMap'}>
          <MapContainer
            center={getInitialPosition()}
            zoom={12}
            maxBounds={[
              [59.4, 23.8],
              [61.5, 25.8],
            ]}
            dragging={!L.Browser.mobile}
            tap={!L.Browser.mobile}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={MAP_TILES_URL}
            />
            {searchResults.map((x) =>
              x.coordinate_lat && x.coordinate_lon ? (
                <Marker
                  key={x.uuid}
                  icon={getMarkerIcon(x)}
                  position={[x.coordinate_lat, x.coordinate_lon]}
                  eventHandlers={{ click: () => handleMarkerClick(x) }}
                />
              ) : null
            )}
          </MapContainer>
          {activeProject && (
            <ProjectCard project={activeProject} hideImgOnSmallScreen={true} currentLang={currentLang} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapResults;
