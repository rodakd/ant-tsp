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

export const cost = (path: t.Marker[] | null) => {
  if (!path?.length) {
    return 0;
  }

  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
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
    const [lng, lat] = row.split(' ');
    return [Number(lng), Number(lat)];
  });
  return markers;
};
