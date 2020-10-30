import React from 'react';
import css from './SearchResults.module.scss';
import { Project } from '../../../../types/common';
import { useTranslation } from 'react-i18next';
import { Map, TileLayer } from 'react-leaflet';

type Props = {
  searchResults: Project[];
};

const MapContainer = ({ searchResults }: Props) => {
  const { t } = useTranslation();
  const sami = {
    lat: 51,
    lng: -1,
    zoom: 13,
  };
  const position = [sami.lat, sami.lng];

  return (
    <div className={css.container}>
      <div id={'mapid'}>
        <Map center={[51, 0]} zoom={13}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.hel.ninja/styles/hel-osm-bright/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    </div>
  );
};

export default MapContainer;
