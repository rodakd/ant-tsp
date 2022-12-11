import * as t from '~/types';
import { createWorker } from './createWorker';

async function TSPCustom(app: t.App) {
  const gt = globalThis as any;
  gt['app'] = app;

  try {
    await Object.getPrototypeOf(async function () {}).constructor(app.params.code)();
  } catch (err) {
    if (err === 'Stopped') {
      return;
    }
    app.error(JSON.stringify(err));
    throw err;
  } finally {
    delete gt['app'];
  }
}

createWorker(TSPCustom);
