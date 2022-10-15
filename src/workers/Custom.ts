import * as t from '~/types';
import { createWorker } from './createWorker';

async function custom(app: Readonly<t.WorkerInterface>) {
  while (app.running) {
    app.updateIteration(app.iteration + 1);
    await app.sleep();
  }
}

createWorker(custom);
