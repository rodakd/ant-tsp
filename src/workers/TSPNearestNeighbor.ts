import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Nearest Neighbour greedy heuristic for the TSP
async function TSPNearestNeighbor(app: t.App) {
  const { cost, d, tour, n } = app.getInput();

  let length = cost,
    i: number,
    j: number,
    nearest: number,
    costIns: number;

  for (i = 1; i < n; i++) {
    nearest = i;
    costIns = d[tour[i - 1]][tour[i]];

    for (j = i + 1; j < n; j++) {
      app.incrementIteration();

      await app.updateCurrentTour(() => {
        const currentTour = tour.slice();
        move(currentTour, i, j);
        return currentTour;
      });

      if (d[tour[i - 1]][tour[j]] < costIns) {
        costIns = d[tour[i - 1]][tour[j]];
        nearest = j;
      }

      await app.sleep();
    }

    move(tour, i, nearest);
    length = app.helpers.matrixCost(d, tour);
    await app.updateBestTour(() => tour, length);
  }

  app.end();
}

function move(tour: number[], i: number, nearest: number) {
  const swap = tour[i];
  tour[i] = tour[nearest];
  tour[nearest] = swap;
}

createWorker(TSPNearestNeighbor);
