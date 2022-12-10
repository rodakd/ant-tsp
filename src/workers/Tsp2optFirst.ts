import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 2-opt neighbourhood and first improvement policy
async function Tsp2optFirst(app: Readonly<t.WorkerInterface>) {
  const d = app.getDistanceMatrix();
  const idxTour = app.getRandomIdxTour();
  const t = app.idxTourToDS2opt(idxTour);

  let i, last_i, j, delta, next_i, next_j, length, iteration;

  i = 0;
  last_i = 0;
  length = app.calcCostByMatrix(d, idxTour);
  iteration = 0;

  app.updateBestTourByDS2opt(t, length);

  const move = (t: number[], i: number, j: number, next_i: number, next_j: number) => {
    t[i] = j ^ 1;
    t[j] = i ^ 1;
    t[next_i ^ 1] = next_j;
    t[next_j ^ 1] = next_i;
  };

  while (t[t[i]] >> 1 !== last_i) {
    j = t[t[i]];

    while (j >> 1 !== last_i && (t[j] >> 1 !== last_i || i >> 1 !== last_i)) {
      iteration += 1;
      app.updateIteration(iteration);

      delta =
        d[i >> 1][j >> 1] + d[t[i] >> 1][t[j] >> 1] - d[i >> 1][t[i] >> 1] - d[j >> 1][t[j] >> 1];

      const currentT = [...t];
      move(currentT, i, j, t[i], t[j]);
      app.updateCurrentTourByDS2opt(currentT);

      if (delta < 0) {
        next_i = t[i];
        next_j = t[j];
        move(t, i, j, next_i, next_j);
        length += delta;
        last_i = i >> 1;
        app.updateBestTourByDS2opt(t, length);
      }
      j = t[j];

      await app.sleep();
    }

    i = t[i];
  }

  app.end();
}

createWorker(Tsp2optFirst);
