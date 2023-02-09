import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 3-opt neighbourhood and first improvement policy
export async function TSP3optFirst(app: t.App) {
  const { d, tour, cost } = app.getInput();
  const succ = app.helpers.tourToSuccessors(tour);

  let lastI = 0,
    lastJ = succ[0],
    lastK = succ[succ[0]],
    length = cost,
    i = lastI,
    j = lastJ,
    k = lastK,
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

      lastI = i;
      lastJ = j;
      lastK = k;

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

    if (i === lastI && j === lastJ && k === lastK) {
      break;
    }
  }

  app.end();
}

function move(succ: number[], i: number, j: number, k: number) {
  const swapI = succ[i];
  const swapJ = succ[j];
  const swapK = succ[k];
  succ[i] = swapJ;
  succ[j] = swapK;
  succ[k] = swapI;
}

createWorker(TSP3optFirst);
