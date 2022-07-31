import * as t from '~/types';
import { createWorker } from './createWorker';

async function twoOpt(state: Readonly<t.WorkerState>) {
  while (state.running) {
    state.updateIteration(state.iteration + 1);
    await state.sleep();
  }
}

createWorker(twoOpt);
