import * as t from '~/types';
import { createWorker } from './createWorker';

async function aco(state: t.WorkerState, params: t.ACOParams) {
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

createWorker(aco);
