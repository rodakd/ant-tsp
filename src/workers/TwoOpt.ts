import * as t from '~/types';
import { createWorker } from './createWorker';

async function twoOpt(state: t.WorkerState): t.WorkerResult {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!state.running) {
      return { path: [], cost: 0 };
    }

    console.log(state);
    await new Promise((res) => {
      setTimeout(() => res(true), 1000);
    });
  }
}

createWorker(twoOpt);
