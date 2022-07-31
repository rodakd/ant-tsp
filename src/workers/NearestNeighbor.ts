import * as t from '~/types';
import { createWorker } from './createWorker';

async function nearestNeighbor(state: t.WorkerState) {
  let iteration = 0;

  while (state.running) {
    await new Promise((res) => {
      setTimeout(() => res(true), 100);
    });

    if (state.paused) {
      continue;
    }

    state.updateIteration(++iteration);
  }
}

createWorker(nearestNeighbor);
