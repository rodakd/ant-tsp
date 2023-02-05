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

export const idxTourToMarkerPath = (idxTour: number[], markers: t.Marker[]) => {
  const path: t.Marker[] = [];
  idxTour.forEach((idx) => {
    path.push(markers[idx]);
  });
  path.push(markers[idxTour[0]]);
  return path;
};

export const idxTourToSuccessors = (idxTour: number[]) => {
  const n = idxTour.length;
  const successors = new Array<number>(n).fill(-1);

  for (let i = 0; i < n; i++) {
    successors[idxTour[i]] = idxTour[(i + 1) % n];
  }

  return successors;
};

export const successorsToIdxTour = (succ: number[]) => {
  const n = succ.length;
  const tour = new Array<number>(n).fill(-1);
  let j = 0;

  for (let i = 0; i < n; i++) {
    tour[i] = j;
    j = succ[j];
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

export const uploadFile = (accept: string) => {
  return new Promise<string | null>((res) => {
    const el = document.createElement('input');
    el.type = 'file';
    el.accept = accept;
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

export const prepareMarkers = (markers: t.Marker[]) => {
  const parsed: t.Marker[] = [];

  // deduplicate markers
  for (let i = 0; i < markers.length; i++) {
    const x = markers[i];
    let push = true;

    for (let j = i + 1; j < markers.length; j++) {
      const y = markers[j];
      if (x[0] === y[0] && x[1] === y[1]) {
        push = false;
        break;
      }
    }

    if (push) {
      parsed.push(x);
    }
  }

  // fix lat long to 6 precision which is typically good enough
  parsed.forEach((marker) => {
    marker[0] = Number(marker[0].toFixed(6));
    marker[1] = Number(marker[1].toFixed(6));
  });

  return parsed;
};

export const parseStringToMarkers = (text: string) => {
  const rows = text.split(/\r\n|\r|\n/).filter((t) => !!t);
  const markers = rows.map<t.Marker>((row) => {
    const [a, b] = row.split(' ');
    const longitude = Number(a);
    const latitude = Number(b);
    if (isNaN(longitude) || isNaN(latitude)) {
      throw 'Invalid format';
    }
    return [longitude, latitude];
  });
  return markers;
};

export const importWorker = (workerUrl: URL) => {
  return new Worker(workerUrl, { type: 'module' });
};
