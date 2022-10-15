import * as t from '~/types';
import { CustomParams } from '~/types';
import { createWorker } from './createWorker';

async function custom(app: Readonly<t.WorkerInterface<CustomParams>>) {
  eval(app.params.code);
}

createWorker(custom);
