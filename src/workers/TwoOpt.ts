import * as t from '~/types';

import { cost } from '~/helpers';
import { createWorker } from './createWorker';

async function twoOpt(app: Readonly<t.WorkerInterface>) {
  const tour = [...app.markers];
  tour.push(tour[0]);
  app.updateBestTour(tour);

  let best = cost(tour);
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 1; i < tour.length - 1; i++) {
      for (let j = i + 1; j < tour.length - 1; j++) {
        app.updateIteration(app.iteration + 1);

        const section = tour.slice(i, j + 1);
        section.reverse();

        tour.splice(i, j + 1 - i, ...section);
        const newTour = tour;
        const newCost = cost(newTour);

        app.updateCurrentTour([
          ...tour.slice(0, i),
          ...tour.slice(i + 1, j),
          ...tour.slice(j + 1),
          ...[tour[i - 1], tour[i], tour[i + 1]],
          ...[tour[j - 1], tour[j], tour[j + 1]],
        ]);

        await app.sleep();

        if (newCost < best) {
          swapped = true;
          best = newCost;
          app.updateBestTour(newTour);
        } else {
          section.reverse();
          tour.splice(i, j + 1 - i, ...section);
        }

        app.updateCurrentTour(tour);
        await app.sleep();
      }
    }
  }
}

createWorker(twoOpt);
