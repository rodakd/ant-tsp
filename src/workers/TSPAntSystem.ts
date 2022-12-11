import * as t from '~/types';
import { createWorker } from './createWorker';

// This is a port of Python code originally published by Éric D. Taillard
// It was slightly modified for the needs of this application
// http://mistic.heig-vd.ch/taillard/
// Copyright: E. Taillard 2022 CC-BY 4.0

// Fast Ant System for the TSP
async function TSPAntSystem(app: Readonly<t.WorkerInterface>) {
  function initTrail(initialVal: number, trail: number[][]) {
    const n = trail[0].length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        trail[i][j] = initialVal;
      }
    }
    for (let i = 0; i < n; i++) {
      trail[i][i] = 0;
    }
    return trail;
  }

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function updateTrail(
    tour: number[],
    globalBest: number[],
    exploration: number,
    exploitation: number,
    trail: number[][]
  ): [number[][], number] {
    if (tour == globalBest) {
      exploration += 1;
      trail = initTrail(exploration, trail);
    } else {
      for (let i = 0; i < tour.length; i++) {
        const n = trail[0].length;
        trail[tour[i]][tour[(i + 1) % n]] += exploration;
        trail[globalBest[i]][globalBest[(i + 1) % n]] += exploitation;
      }
    }
    return [trail, exploration];
  }

  function generateSolutionTrail(
    d: number[][],
    tour: number[],
    trail: number[][]
  ): [number[], number] {
    const n = tour.length;
    for (let i = 1; i < n - 1; i++) {
      let total = 0;
      for (let j = i + 1; j < n; j++) {
        total += trail[tour[i - 1]][tour[j]];
      }
      const target = getRandomIntInclusive(0, total - 1);
      let j = i;
      total = trail[tour[i - 1]][tour[j]];
      while (total < target) {
        total += trail[tour[i - 1]][tour[j + 1]];
        j += 1;
      }
      const temp = tour[j];
      tour[j] = tour[i];
      tour[i] = temp;
    }
    return [tour, app.helpers.matrixCost(d, tour)];
  }

  async function tspLK(D: number[][], tour: number[], length: number): Promise<[number[], number]> {
    let succ = app.helpers.tourToSuccessors(tour);

    const tabu: number[][] = [];
    for (let i = 0; i < n; i++) {
      tabu[i] = [];
      for (let j = 0; j < n; j++) {
        tabu[i][j] = 0;
      }
    }

    let iteration = 0,
      last_a = 0,
      a = 0,
      improved = true,
      d = null;

    function move(succ: number[], si: number, i: number, c: number, d: number, b: number) {
      succ[b] = d;
      while (i != c) {
        const swap_i = i;
        const swap_succsi = succ[si];
        const swap_si = si;

        succ[si] = swap_i;
        i = swap_si;
        si = swap_succsi;
      }
    }

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
          app.incrementIteration();

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

          await app.updateCurrentTour(() => {
            const currentSucc = succ.slice();
            move(currentSucc, currentSucc[b], b, c, currentSucc[c], b);
            return app.helpers.successorsToTour(currentSucc);
          });
        }

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
            tour = app.helpers.successorsToTour(succ);
            await app.updateTrail(() => tour);
          }
        }
      }

      succ = app.helpers.tourToSuccessors(tour);
      a = succ[a];
    }

    return [tour, length];
  }

  const input = app.getInput();
  const {
    d,
    params: { exploitation },
  } = input;
  const n = d[0].length;

  let tour = input.tour;
  let bestCost = input.cost;
  let exploration = 1;
  let cost = 0;
  let bestSol = tour.slice();
  let trail = initTrail(exploration, new Array<number[]>(n).fill(new Array(n).fill(-1)));

  for (let i = 0; i < 5; i++) {
    [tour, cost] = generateSolutionTrail(d, tour, trail);
    await app.updateTrail(() => tour);
    [tour, cost] = await tspLK(d, tour, cost);

    if (Number(cost.toFixed(7)) < Number(bestCost.toFixed(7))) {
      bestCost = cost;
      bestSol = tour.slice();
      exploration = 1;
      trail = initTrail(exploration, trail);
      await app.updateBestTour(() => bestSol, bestCost);
    } else {
      [trail, exploration] = updateTrail(tour, bestSol, exploration, exploitation, trail);
    }
  }

  app.end();
}

createWorker(TSPAntSystem);
