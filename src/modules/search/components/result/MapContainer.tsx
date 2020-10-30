import React from 'react';
import ReactDOMServer from 'react-dom/server';
import css from './SearchResults.module.scss';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { IconLocation } from "hds-react";
import L from 'leaflet';

type Props = {
  searchResults: Project[];
};

const MapContainer = ({ searchResults }: Props) => {
  const { t } = useTranslation();
  const sami = {
    lat: 60.2,
    lng: 24.92,
    zoom: 13,
  };
  const position = [sami.lat, sami.lng];

  const icon = L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<IconLocation size={'l'} />)
  });

  return (
    <div className={css.container}>
      <div id={'mapid'}>
        <Map center={[60.2, 24.92]} zoom={13} maxBounds={[[59.4, 23.8], [61.5, 25.8]]}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png"
          />
          {
            searchResults.map(x => <Marker icon={icon} position={[60.2, 24.92]} />)
          }
        </Map>
      </div>
    </div>
  );
};

export default MapContainer;
