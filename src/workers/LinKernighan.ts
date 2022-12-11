import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Basic Lin & Kernighan improvement procedure for the TSP
async function LinKernighan(app: Readonly<t.WorkerInterface>) {
  const D = app.getDistanceMatrix();
  let tour = app.getRandomIdxTour();
  let succ = app.idxTourToSuccessors(tour);
  let length = app.calcCostByMatrix(D, tour);
  const n = tour.length;

  const tabu: number[][] = [];
  for (let i = 0; i < n; i++) {
    tabu[i] = [];
    for (let j = 0; j < n; j++) {
      tabu[i][j] = 0;
    }
  }

  let iteration = 0,
    appIteration = 0,
    last_a = 0,
    a = 0,
    improved = true,
    d = null;

  app.updateBestTourByIdxTour(tour, length);

  const move = (succ: number[], si: number, i: number, c: number, d: number, b: number) => {
    succ[b] = d;
    while (i != c) {
      const swap_i = i;
      const swap_succsi = succ[si];
      const swap_si = si;

      succ[si] = swap_i;
      i = swap_si;
      si = swap_succsi;
    }
  };

  while (a != last_a || improved) {
    improved = false;
    iteration += 1;
    let b = succ[a];
    let path_length = length - D[a][b];
    let path_modified = true;

    while (path_modified) {
      path_modified = false;
      let ref_struct_cost = length;
      let c = succ[b];
      let best_c = c;

      while (succ[c] != a) {
        const d = succ[c];

        if (path_length - D[c][d] + D[c][a] + D[b][d] < length) {
          best_c = c;
          ref_struct_cost = path_length - D[c][d] + D[c][a] + D[b][d];
          break;
        }

        if (tabu[c][d] != iteration && path_length + D[b][d] < ref_struct_cost) {
          ref_struct_cost = path_length + D[b][d];
          best_c = c;
        }

        c = d;
      }

      appIteration += 1;
      app.updateIteration(appIteration);

      const currentSucc = [...succ];
      move(currentSucc, currentSucc[b], b, c, currentSucc[c], b);
      app.updateCurrentTourBySuccessors(currentSucc);

      await app.sleep();

      // need to fix numbers cause of float rounding error
      if (Number(ref_struct_cost.toFixed(7)) < Number(length.toFixed(7))) {
        path_modified = true;
        c = best_c;
        d = succ[best_c];
        tabu[c][d] = tabu[d][c] = iteration;
        path_length += D[b][d] - D[c][d];
        const i = b;
        const si = succ[b];

        move(succ, si, i, c, d, b);

        b = c;

        if (path_length + D[a][b] < length) {
          length = path_length + D[a][b];
          succ[a] = b;
          last_a = b;
          improved = true;
          tour = app.successorsToIdxTour(succ);
          app.updateBestTourByIdxTour(tour, length);
        }
      }
    }

    succ = app.idxTourToSuccessors(tour);
    a = succ[a];
  }

  app.end();
}

createWorker(LinKernighan);
