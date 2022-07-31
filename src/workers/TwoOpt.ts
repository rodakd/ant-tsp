import * as t from '~/types';

import { cost } from '~/helpers';
import { createWorker } from './createWorker';

async function twoOpt(state: Readonly<t.WorkerState>) {
  const tour = [...state.markers];
  tour.push(tour[0]);
  state.updateBestTour(tour);

  let best = cost(tour);
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 1; i < tour.length - 1; i++) {
      for (let j = i + 1; j < tour.length - 1; j++) {
        state.updateIteration(state.iteration + 1);

        const section = tour.slice(i, j + 1);
        section.reverse();

        tour.splice(i, j + 1 - i, ...section);
        const newTour = tour;
        const newCost = cost(newTour);

        state.updateCurrentTour([
          ...tour.slice(0, i),
          ...tour.slice(i + 1, j),
          ...tour.slice(j + 1),
          ...[tour[i - 1], tour[i], tour[i + 1]],
          ...[tour[j - 1], tour[j], tour[j + 1]],
        ]);

        await state.sleep();

        if (newCost < best) {
          swapped = true;
          best = newCost;
          state.updateBestTour(newTour);
        } else {
          section.reverse();
          tour.splice(i, j + 1 - i, ...section);
        }

        state.updateCurrentTour(tour);
        await state.sleep();
      }
    }
  }
}

createWorker(twoOpt);
