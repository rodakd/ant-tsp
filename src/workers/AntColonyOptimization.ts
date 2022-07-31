import * as t from '~/types';
import { createWorker } from './createWorker';

async function aco(state: Readonly<t.WorkerState<t.ACOParams>>) {
  while (state.running) {
    state.updateIteration(state.iteration + 1);
    await state.sleep();
  }
}

createWorker(aco);
