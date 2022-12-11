import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 2-opt neighbourhood and best improvement policy
async function TSP2optBest(app: Readonly<t.WorkerInterface>) {
  const { d, cost, n, tour } = app.getInput();
  let length = cost;

  let bestDelta = -1,
    bestI: number,
    j: number,
    i: number,
    delta: number,
    bestJ: number;

  while (bestDelta < 0) {
    bestDelta = Infinity;
    bestI = bestJ = -1;

    for (i = 0; i < n - 2; i++) {
      j = i + 2;

      while (j < n && (i > 0 || j < n - 1)) {
        app.incrementIteration();

        await app.updateCurrentTour(() => {
          const currentTour = tour.slice();
          move(currentTour, i + 1, j);
          return currentTour;
        });

        delta =
          d[tour[i]][tour[j]] +
          d[tour[i + 1]][tour[(j + 1) % n]] -
          d[tour[i]][tour[i + 1]] -
          d[tour[j]][tour[(j + 1) % n]];

        if (delta < bestDelta) {
          bestDelta = delta;
          bestI = i;
          bestJ = j;
        }

        j += 1;
      }
    }

    if (bestDelta < 0) {
      length += bestDelta;
      i = bestI + 1;
      j = bestJ;

      move(tour, i, j);

      await app.updateBestTour(() => tour, length);
    }
  }

  app.end();
}

function move(tour: number[], i: number, j: number) {
  let swap;

  while (i < j) {
    swap = tour[i];
    tour[i] = tour[j];
    tour[j] = swap;
    i = i + 1;
    j = j - 1;
  }
}

createWorker(TSP2optBest);
