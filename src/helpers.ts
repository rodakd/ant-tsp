import * as t from '~/types';

// https://www.movable-type.co.uk/scripts/latlong.html
export const distance = (markerA: t.Marker, markerB: t.Marker) => {
  const lon1 = markerA[0];
  const lon2 = markerB[0];
  const lat1 = markerA[1];
  const lat2 = markerB[1];

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d / 1000; // in km
};

export const cost = (path: t.Marker[] | null) => {
  if (!path?.length) {
    return 0;
  }

  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};

export const createDistanceMatrix = (markers: t.Marker[]) => {
  const matrix: number[][] = [];

  for (let i = 0; i < markers.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < markers.length; j++) {
      matrix[i][j] = distance(markers[i], markers[j]);
    }
  }

  return matrix;
};

export const uploadFile = () => {
  return new Promise<string | null>((res) => {
    const el = document.createElement('input');
    el.type = 'file';
    el.accept = '.txt';
    el.addEventListener('change', () => {
      if (!el.files?.[0]) {
        return res(null);
      }

      const fr = new FileReader();
      fr.onload = function () {
        const str = fr.result?.toString();

        if (!str) {
          return res(null);
        }

        return res(str);
      };
      fr.readAsText(el.files[0]);
    });
    el.click();
  });
};

export const parseStringToMarkers = (text: string) => {
  const rows = text.split(/\r\n|\r|\n/).filter((t) => !!t);
  const markers = rows.map<t.Marker>((row) => {
    const [a, b] = row.split(' ');
    const longitude = Number(a);
    const latitude = Number(b);
    return [longitude, latitude];
  });
  return markers;
};
