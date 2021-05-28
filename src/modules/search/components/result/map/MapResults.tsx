import React, { createRef, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { Button, IconCross, IconLocation, IconMenuHamburger } from 'hds-react';
import L from 'leaflet';
import { DataConfig, Project, StateOfSale } from '../../../../../types/common';
import { calculateApartmentCount } from '../../../utils/calculateApartmentCount';
import MapProjectCard from './MapProjectCard';
import MapProjectPopupCard from './MapProjectPopupCard';
import css from './MapResults.module.scss';

type Props = {
  config: DataConfig | undefined;
  header: string;
  searchResults: Project[];
  closeMap: () => void;
  currentLang: string;
  resultCountByProjects?: boolean;
  hideApartments?: boolean;
};

const MAP_TILES_URL =
  process.env.REACT_APP_MAP_TILES_URL || 'https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png';

const MapResults = ({
  config,
  header,
  searchResults,
  closeMap,
  currentLang,
  resultCountByProjects = false,
  hideApartments = false,
}: Props) => {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState<Project | undefined>(undefined);
  const popupRef = useRef<any>([]);
  const activeProjectRef = useRef<HTMLDivElement>(null);
  popupRef.current = searchResults.map((element, i) => popupRef.current[i] ?? createRef());

  const closePopups = (ref: any) => {
    if (ref.current) {
      ref.current.remove();
    }
  };

  const handleMarkerPopupClick = (targetProject: Project, ref: any) => {
    closePopups(ref);
    setActiveProject(targetProject);

    if (activeProjectRef.current) {
      activeProjectRef.current.focus();
    }
  };

  const hideProject = () => {
    setActiveProject(undefined);
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
        <IconLocation size={'m'} color={isActive ? 'white' : color} aria-label={t('SEARCH:aria-map-marker')} />
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
    <section className={css.container} aria-label={header}>
      <header>
        <div className={css.titleContainer}>
          <h2>{header}</h2>
          <div className={css.resultsCount}>
            {t('SEARCH:total')}{' '}
            {resultCountByProjects
              ? `${searchResults.length} ${t('SEARCH:projects')}`
              : `${calculateApartmentCount(searchResults, currentLang)} ${t('SEARCH:apartments')}`}
          </div>
        </div>
        <div>
          <Button className={css.showButton} variant="secondary" onClick={closeMap}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconMenuHamburger style={{ marginRight: 20 }} aria-hidden="true" /> {t('SEARCH:show-as-list')}
            </div>
          </Button>
        </div>
      </header>

      <div className={css.mapContainer}>
        <div className={css.mapWrapper} id={'asuReactMap'}>
          <MapContainer
            center={getInitialPosition()}
            zoom={12}
            maxBounds={[
              [59.4, 23.8],
              [61.5, 25.8],
            ]}
            dragging={!L.Browser.mobile}
            tap={!L.Browser.mobile}
            zoomControl={false}
          >
            {!L.Browser.mobile && <ZoomControl position="bottomright" />}
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={MAP_TILES_URL}
            />
            {searchResults.map((x, i) =>
              x.coordinate_lat && x.coordinate_lon ? (
                <Marker
                  key={x.uuid}
                  icon={getMarkerIcon(x)}
                  position={[x.coordinate_lat, x.coordinate_lon]}
                  title={x.housing_company}
                >
                  <Popup
                    ref={popupRef.current[i]}
                    closeButton={false}
                    className={css.popup}
                    onOpen={() => hideProject()}
                  >
                    <MapProjectPopupCard
                      project={x}
                      currentLang={currentLang}
                      onCloseBtnClick={() => closePopups(popupRef.current[i])}
                      onApartmentsBtnClick={() => handleMarkerPopupClick(x, popupRef.current[i])}
                      hideApartments={hideApartments}
                      activeProject={activeProject}
                    />
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
          <div ref={activeProjectRef} tabIndex={-1}>
            {!hideApartments && activeProject && (
              <div
                className={css.activeProjectWrapper}
                id={`map-project-popup-${activeProject.id}`}
                aria-label={activeProject.housing_company}
              >
                <button
                  className={css.closeIcon}
                  onClick={() => hideProject()}
                  aria-label={t('SEARCH:aria-hide-project-popup')}
                >
                  <IconCross aria-hidden="true" />
                </button>
                <div className={css.activeProjectDetails}>
                  <MapProjectCard config={config} project={activeProject} currentLang={currentLang} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapResults;
