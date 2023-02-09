import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Basic Lin & Kernighan improvement procedure for the TSP
export async function TSPLinKernighan(app: t.App) {
  const input = app.getInput();
  const D = input.d;
  const n = input.n;
  let tour = input.tour;
  let length = input.cost;
  let succ = app.helpers.tourToSuccessors(tour);

  const tabu: number[][] = [];
  for (let i = 0; i < n; i++) {
    tabu[i] = [];
    for (let j = 0; j < n; j++) {
      tabu[i][j] = 0;
    }
  }

  let iteration = 0,
    lastA = 0,
    a = 0,
    improved = true,
    d = null;

  while (a != lastA || improved) {
    improved = false;
    iteration += 1;
    let b = succ[a];
    let pathLength = length - D[a][b];
    let pathModified = true;

    while (pathModified) {
      pathModified = false;
      let refStructCost = length;
      let c = succ[b];
      let bestC = c;

      while (succ[c] != a) {
        app.incrementIteration();

        const d = succ[c];

        if (pathLength - D[c][d] + D[c][a] + D[b][d] < length) {
          bestC = c;
          refStructCost = pathLength - D[c][d] + D[c][a] + D[b][d];
          break;
        }

        if (tabu[c][d] != iteration && pathLength + D[b][d] < refStructCost) {
          refStructCost = pathLength + D[b][d];
          bestC = c;
        }

        c = d;

        await app.updateCurrentTour(() => {
          const currentSucc = succ.slice();
          move(currentSucc, currentSucc[b], b, c, currentSucc[c], b);
          return app.helpers.successorsToTour(currentSucc);
        });
      }

      if (Number(refStructCost.toFixed(7)) < Number(length.toFixed(7))) {
        pathModified = true;
        c = bestC;
        d = succ[bestC];
        tabu[c][d] = tabu[d][c] = iteration;
        pathLength += D[b][d] - D[c][d];
        const i = b;
        const si = succ[b];

        move(succ, si, i, c, d, b);

        b = c;

        if (pathLength + D[a][b] < length) {
          length = pathLength + D[a][b];
          succ[a] = b;
          lastA = b;
          improved = true;
          tour = app.helpers.successorsToTour(succ);
          await app.updateBestTour(() => tour, length);
        }
      }
    }

    succ = app.helpers.tourToSuccessors(tour);
    a = succ[a];
  }

  app.end();
}

function move(succ: number[], si: number, i: number, c: number, d: number, b: number) {
  succ[b] = d;
  while (i != c) {
    const swapI = i;
    const swapSuccSI = succ[si];
    const swapSI = si;

    succ[si] = swapI;
    i = swapSI;
    si = swapSuccSI;
  }
}

createWorker(TSPLinKernighan);
