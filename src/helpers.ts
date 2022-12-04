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

export const arrayCost = (path: t.Marker[] | null) => {
  if (!path?.length) {
    return 0;
  }

  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};

export const matrixCost = (matrix: number[][], tour: number[]) => {
  let cost = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    const idxCityA = tour[i];
    const idxCityB = tour[i + 1];
    cost += matrix[idxCityA][idxCityB];
  }
  cost += matrix[tour[tour.length - 1]][tour[0]];
  return cost;
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

export const createRandomPermutation = (n: number) => {
  const perm = [];

  for (let i = 0; i < n; i++) {
    perm.push(i);
  }

  return shuffleArray(perm);
};

export const idxTourToDS2opt = (idxTour: number[]) => {
  const n = idxTour.length;
  const t = new Array(2 * n).fill(-1);

  // Forward tour
  for (let i = 0; i < n - 1; i++) {
    t[2 * idxTour[i]] = 2 * idxTour[i + 1];
  }
  t[2 * idxTour[n - 1]] = 2 * idxTour[0];

  // Backward tour
  for (let i = 1; i < n; i++) {
    t[2 * idxTour[i] + 1] = 2 * idxTour[i - 1] + 1;
  }
  t[2 * idxTour[0] + 1] = 2 * idxTour[n - 1] + 1;

  return t;
};

export const idxTourToMarkerPath = (idxTour: number[], markers: t.Marker[]) => {
  const path: t.Marker[] = [];
  idxTour.forEach((idx) => {
    path.push(markers[idx]);
  });
  path.push(markers[idxTour[0]]);
  return path;
};

export const ds2optToIdxTour = (t: number[]) => {
  const n = Math.ceil(t.length / 2);
  const tour = new Array(n).fill(-1);
  let j = 0;

  for (let i = 0; i < n; i++) {
    tour[i] = j >> 1;
    j = t[j];
  }

  return tour;
};

// Fisher–Yates shuffle
export const shuffleArray = (arr: any[]) => {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
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

export const deduplicateMarkers = (markers: t.Marker[]) => {
  const parsed: t.Marker[] = [];

  for (let i = 0; i < markers.length; i++) {
    const x = markers[i];
    let push = true;

    for (let j = i + 1; j < markers.length; j++) {
      const y = markers[j];
      if (x[0] === y[0] || x[1] === y[1]) {
        push = false;
        break;
      }
    }

    if (push) {
      parsed.push(x);
    }
  }

  return parsed;
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
