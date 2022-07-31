import * as t from '~/types';

// haversine great circle distance
export const distance = (markerA: t.Marker, markerB: t.Marker) => {
  const [lng1, lat1] = markerA;
  const [lng2, lat2] = markerB;

  if (lat1 === lat2 && lng1 === lng2) {
    return 0;
  }

  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;

  const theta = lng1 - lng2;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;

  return dist * 60 * 1.1515 * 1.609344;
};

export const cost = (path: t.Marker[]) => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};
