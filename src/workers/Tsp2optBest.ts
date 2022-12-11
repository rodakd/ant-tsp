import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Local search with 2-opt neighbourhood and best improvement policy
async function TSP2optBest(app: Readonly<t.WorkerInterface>) {
  const d = app.getDistanceMatrix();
  const tour = app.getRandomIdxTour();
  const n = tour.length;

  let best_delta, best_i, j, i, delta, best_j, iteration, length, swap;
  best_delta = -1;
  iteration = 0;
  length = app.calcCostByMatrix(d, tour);

  app.updateBestTourByIdxTour(tour, length);

  const move = (tour: number[], i: number, j: number) => {
    while (i < j) {
      swap = tour[i];
      tour[i] = tour[j];
      tour[j] = swap;
      i = i + 1;
      j = j - 1;
    }
  };

  while (best_delta < 0) {
    best_delta = Infinity;
    best_i = best_j = -1;

    for (i = 0; i < n - 2; i++) {
      j = i + 2;
      while (j < n && (i > 0 || j < n - 1)) {
        iteration += 1;
        app.updateIteration(iteration);

        delta =
          d[tour[i]][tour[j]] +
          d[tour[i + 1]][tour[(j + 1) % n]] -
          d[tour[i]][tour[i + 1]] -
          d[tour[j]][tour[(j + 1) % n]];

        const currentTour = [...tour];
        move(currentTour, i + 1, j);
        app.updateCurrentTourByIdxTour(currentTour);

        if (delta < best_delta) {
          best_delta = delta;
          best_i = i;
          best_j = j;
        }
        j += 1;

        await app.sleep();
      }
    }

    if (best_delta < 0) {
      length += best_delta;
      i = best_i + 1;
      j = best_j;

      move(tour, i, j);

      app.updateBestTourByIdxTour(tour, length);
    }
  }

  app.end();
}

createWorker(TSP2optBest);
