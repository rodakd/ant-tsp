import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Nearest Neighbour greedy heuristic for the TSP
async function NearestNeighbor(app: Readonly<t.WorkerInterface>) {
  const d = app.getDistanceMatrix();
  const tour = app.getRandomIdxTour();
  const n = tour.length;

  let length, i, j, nearest, cost_ins, swap, iteration;
  length = 0;
  iteration = 0;

  const move = (tour: number[], i: number, nearest: number) => {
    swap = tour[i];
    tour[i] = tour[nearest];
    tour[nearest] = swap;
  };

  length = app.calcCostByMatrix(d, tour);
  app.updateBestTourByIdxTour(tour, length);

  for (i = 1; i < n; i++) {
    iteration += 1;
    app.updateIteration(iteration);
    nearest = i;
    cost_ins = d[tour[i - 1]][tour[i]];

    for (j = i + 1; j < n; j++) {
      const currentTour = [...tour];
      move(currentTour, i, j);
      app.updateCurrentTourByIdxTour(currentTour);

      if (d[tour[i - 1]][tour[j]] < cost_ins) {
        cost_ins = d[tour[i - 1]][tour[j]];
        nearest = j;
      }

      await app.sleep();
    }

    move(tour, i, nearest);

    length = app.calcCostByMatrix(d, tour);
    app.updateBestTourByIdxTour(tour, length);
  }

  app.end();
}

createWorker(NearestNeighbor);
