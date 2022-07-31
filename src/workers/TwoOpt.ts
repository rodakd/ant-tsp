import * as t from '~/types';

import { cost } from '~/helpers';
import { createWorker } from './createWorker';

async function twoOpt(state: Readonly<t.WorkerState>) {
  const path = [...state.markers];
  path.push(path[0]);

  let best = cost(path);
  let swapped = true;

  state.updateBestTour(path);

  while (swapped) {
    swapped = false;
    for (let pt1 = 1; pt1 < path.length - 1; pt1++) {
      for (let pt2 = pt1 + 1; pt2 < path.length - 1; pt2++) {
        state.updateIteration(state.iteration + 1);

        const section = path.slice(pt1, pt2 + 1);

        section.reverse();

        path.splice(pt1, pt2 + 1 - pt1, ...section);

        const newPath = path;
        const newCost = cost(newPath);

        state.updateCurrentTour([
          ...path.slice(0, pt1),
          ...path.slice(pt1 + 1, pt2),
          ...path.slice(pt2 + 1),
          ...[path[pt1 - 1], path[pt1], path[pt1 + 1]],
          ...[path[pt2 - 1], path[pt2], path[pt2 + 1]],
        ]);

        await state.sleep();

        if (newCost < best) {
          swapped = true;
          best = newCost;
          state.updateBestTour(newPath);
        } else {
          section.reverse();
          path.splice(pt1, pt2 + 1 - pt1, ...section);
        }

        state.updateCurrentTour(path);
        await state.sleep();
      }
    }
  }
}

createWorker(twoOpt);
