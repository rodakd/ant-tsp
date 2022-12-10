import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 3-opt neighbourhood and first improvement policy
async function Tsp3optFirst(app: Readonly<t.WorkerInterface>) {
  const d = app.getDistanceMatrix();
  const idxTour = app.getRandomIdxTour();
  const succ = app.idxTourToSuccessors(idxTour);

  let last_i = 0,
    last_j = succ[0],
    last_k = succ[succ[0]],
    i = last_i,
    j = last_j,
    k = last_k,
    iteration = 0,
    length = app.calcCostByMatrix(d, idxTour),
    delta: number,
    sj: number,
    swap_i: number,
    swap_j: number,
    swap_k: number;

  app.updateBestTourBySuccessors(succ, length);

  while (true) {
    iteration += 1;
    app.updateIteration(iteration);

    delta =
      d[i][succ[j]] + d[j][succ[k]] + d[k][succ[i]] - d[i][succ[i]] - d[j][succ[j]] - d[k][succ[k]];

    if (delta < 0) {
      length += delta;

      swap_i = succ[i];
      swap_j = succ[j];
      swap_k = succ[k];
      succ[i] = swap_j;
      succ[j] = swap_k;
      succ[k] = swap_i;

      sj = j;
      j = k;
      k = sj;

      last_i = i;
      last_j = j;
      last_k = k;

      app.updateBestTourBySuccessors(succ, length);
    }

    k = succ[k];

    if (k === i) {
      j = succ[j];
      k = succ[j];
    }

    if (k === i) {
      i = succ[i];
      j = succ[i];
      k = succ[j];
    }

    if (i === last_i && j === last_j && k === last_k) {
      break;
    }

    await app.sleep();
  }

  app.end();
}

createWorker(Tsp3optFirst);
