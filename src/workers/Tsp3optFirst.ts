import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 3-opt neighbourhood and first improvement policy
async function TSP3optFirst(app: Readonly<t.WorkerInterface>) {
  const { d, tour, cost } = app.getInput();
  const succ = app.helpers.tourToSuccessors(tour);

  let last_i = 0,
    last_j = succ[0],
    last_k = succ[succ[0]],
    length = cost,
    i = last_i,
    j = last_j,
    k = last_k,
    delta: number,
    sj: number;

  while (true) {
    app.incrementIteration();

    delta =
      d[i][succ[j]] + d[j][succ[k]] + d[k][succ[i]] - d[i][succ[i]] - d[j][succ[j]] - d[k][succ[k]];

    await app.updateCurrentTour(() => {
      const currentSucc = succ.slice();
      move(currentSucc, i, j, k);
      return app.helpers.successorsToTour(currentSucc);
    });

    if (delta < 0) {
      length += delta;

      move(succ, i, j, k);

      sj = j;
      j = k;
      k = sj;

      last_i = i;
      last_j = j;
      last_k = k;

      await app.updateBestTour(() => app.helpers.successorsToTour(succ), length);
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
  }

  app.end();
}

function move(succ: number[], i: number, j: number, k: number) {
  const swap_i = succ[i];
  const swap_j = succ[j];
  const swap_k = succ[k];
  succ[i] = swap_j;
  succ[j] = swap_k;
  succ[k] = swap_i;
}

createWorker(TSP3optFirst);
