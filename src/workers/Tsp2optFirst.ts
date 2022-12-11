import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 2-opt neighbourhood and first improvement policy
async function TSP2optFirst(app: Readonly<t.WorkerInterface>) {
  const { d, tour, cost } = app.getInput();
  const t = tourToT(tour);

  let i = 0,
    last_i = 0,
    length = cost,
    j: number,
    delta: number,
    next_i: number,
    next_j: number;

  while (t[t[i]] >> 1 !== last_i) {
    j = t[t[i]];

    while (j >> 1 !== last_i && (t[j] >> 1 !== last_i || i >> 1 !== last_i)) {
      app.incrementIteration();

      await app.updateCurrentTour(() => {
        const currentT = t.slice();
        move(currentT, i, j, t[i], t[j]);
        return TtoTour(currentT);
      });

      delta =
        d[i >> 1][j >> 1] + d[t[i] >> 1][t[j] >> 1] - d[i >> 1][t[i] >> 1] - d[j >> 1][t[j] >> 1];

      if (delta < 0) {
        next_i = t[i];
        next_j = t[j];
        length += delta;
        last_i = i >> 1;

        move(t, i, j, next_i, next_j);

        await app.updateBestTour(() => TtoTour(t), length);
      }

      j = t[j];
    }

    i = t[i];
  }

  app.end();
}

function tourToT(tour: number[]) {
  const n = tour.length;
  const t = new Array<number>(2 * n).fill(-1);

  // Forward tour
  for (let i = 0; i < n - 1; i++) {
    t[2 * tour[i]] = 2 * tour[i + 1];
  }
  t[2 * tour[n - 1]] = 2 * tour[0];

  // Backward tour
  for (let i = 1; i < n; i++) {
    t[2 * tour[i] + 1] = 2 * tour[i - 1] + 1;
  }
  t[2 * tour[0] + 1] = 2 * tour[n - 1] + 1;

  return t;
}

function TtoTour(t: number[]) {
  const n = Math.ceil(t.length / 2);
  const tour = new Array<number>(n).fill(-1);
  let j = 0;

  for (let i = 0; i < n; i++) {
    tour[i] = j >> 1;
    j = t[j];
  }

  return tour;
}

function move(t: number[], i: number, j: number, next_i: number, next_j: number) {
  t[i] = j ^ 1;
  t[j] = i ^ 1;
  t[next_i ^ 1] = next_j;
  t[next_j ^ 1] = next_i;
}

createWorker(TSP2optFirst);
