import * as t from '~/types';
import { CustomParams } from '~/types';
import { createWorker } from './createWorker';

async function custom(app: Readonly<t.WorkerInterface<CustomParams>>) {
  const gt = globalThis as any;
  gt['app'] = app;
  await Object.getPrototypeOf(async function () {}).constructor(app.params.code)();
  delete gt['app'];
}

createWorker(custom);
