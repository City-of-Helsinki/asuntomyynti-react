import { Project } from '../../../types/common';

// Centers the map to middle of all the projects on initial render
const getInitialPosition = (searchResults: Project[]): [number, number] => {
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

export default getInitialPosition;
