import * as t from '~/types';
import { createWorker } from './createWorker';

async function custom(app: Readonly<t.WorkerInterface>) {
  const gt = globalThis as any;
  gt['app'] = app;

  try {
    await Object.getPrototypeOf(async function () {}).constructor(app.params.code)();
  } catch (err) {
    app.error();
    throw err;
  } finally {
    delete gt['app'];
  }
}

createWorker(custom);
