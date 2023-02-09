import fs from 'fs';

import { describe } from '@jest/globals';
import { TSP2optFirst } from '../src/workers/Tsp2optFirst';
import { WorkerInstance } from '../src/workers/createWorker';
import { TSP2optBest } from '../src/workers/Tsp2optBest';
import { TSPAntSystem } from '../src/workers/TSPAntSystem';
import { TSPCustom } from '../src/workers/TSPCustom';
import { TSPLinKernighan } from '../src/workers/TSPLinKernighan';
import { TSPNearestNeighbor } from '../src/workers/TSPNearestNeighbor';
import { France } from '../src/datasets/France';
import { Spain } from '../src/datasets/Spain';
import { Canada } from '../src/datasets/Canada';
import { Poland } from '../src/datasets/Poland';
import { prepareMarkers } from '../src/helpers';

const handleError = (err: any) => {
  if (err === 'Stopped') {
    return;
  }
  throw err;
};

const jestConsole = console;

describe('Poland, size 291', () => {
  let wi: WorkerInstance;
  let markers = prepareMarkers(Poland);

  beforeEach(() => {
    global.console = require('console');
    wi = new WorkerInstance();
    wi.performanceMode = true;
    wi.markers = [...markers];
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('2-opt First', async () => {
    console.log('\nRunning tests for Poland (size 291)...\n');
    await TSP2optFirst(wi).catch(handleError);
    console.log(`2-opt First: ${Math.floor(wi.cost)} km`);
  });

  it('2-opt Best', async () => {
    await TSP2optBest(wi).catch(handleError);
    console.log(`2-opt Best: ${Math.floor(wi.cost)} km`);
  });

  it('Ant System', async () => {
    await TSPAntSystem(wi).catch(handleError);
    console.log(`Ant System: ${Math.floor(wi.cost)} km`);
  });

  it('Lin-Kernighan', async () => {
    await TSPLinKernighan(wi).catch(handleError);
    console.log(`Lin-Kernighan: ${Math.floor(wi.cost)} km`);
  });

  it('Nearest Neighbor', async () => {
    await TSPNearestNeighbor(wi).catch(handleError);
    console.log(`Nearest Neighbor: ${Math.floor(wi.cost)} km`);
  });

  it('Custom', async () => {
    const code = fs.readFileSync(require.resolve('../src/custom/nearestNeighbor'), 'utf8');
    wi.params = { code };
    await TSPCustom(wi).catch(handleError);
    console.log(`Custom: ${Math.floor(wi.cost)} km`);
  });
});

describe('Canada, size 625', () => {
  let wi: WorkerInstance;
  let markers = prepareMarkers(Canada);

  beforeEach(() => {
    global.console = require('console');
    wi = new WorkerInstance();
    wi.performanceMode = true;
    wi.markers = [...markers];
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('2-opt First', async () => {
    console.log('\nRunning tests for Canada (size 625)...\n');
    await TSP2optFirst(wi).catch(handleError);
    console.log(`2-opt First: ${Math.floor(wi.cost)} km`);
  });

  it('2-opt Best', async () => {
    await TSP2optBest(wi).catch(handleError);
    console.log(`2-opt Best: ${Math.floor(wi.cost)} km`);
  });

  it('Ant System', async () => {
    await TSPAntSystem(wi).catch(handleError);
    console.log(`Ant System: ${Math.floor(wi.cost)} km`);
  });

  it('Lin-Kernighan', async () => {
    await TSPLinKernighan(wi).catch(handleError);
    console.log(`Lin-Kernighan: ${Math.floor(wi.cost)} km`);
  });

  it('Nearest Neighbor', async () => {
    await TSPNearestNeighbor(wi).catch(handleError);
    console.log(`Nearest Neighbor: ${Math.floor(wi.cost)} km`);
  });

  it('Custom', async () => {
    const code = fs.readFileSync(require.resolve('../src/custom/nearestNeighbor'), 'utf8');
    wi.params = { code };
    await TSPCustom(wi).catch(handleError);
    console.log(`Custom: ${Math.floor(wi.cost)} km`);
  });
});

describe('Spain, size 1135', () => {
  let wi: WorkerInstance;
  let markers = prepareMarkers(Spain);

  beforeEach(() => {
    global.console = require('console');
    wi = new WorkerInstance();
    wi.performanceMode = true;
    wi.markers = [...markers];
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('2-opt First', async () => {
    console.log('\nRunning tests for Spain (size 1135)...\n');
    await TSP2optFirst(wi).catch(handleError);
    console.log(`2-opt First: ${Math.floor(wi.cost)} km`);
  });

  it('2-opt Best', async () => {
    await TSP2optBest(wi).catch(handleError);
    console.log(`2-opt Best: ${Math.floor(wi.cost)} km`);
  });

  it('Ant System', async () => {
    await TSPAntSystem(wi).catch(handleError);
    console.log(`Ant System: ${Math.floor(wi.cost)} km`);
  });

  it('Lin-Kernighan', async () => {
    await TSPLinKernighan(wi).catch(handleError);
    console.log(`Lin-Kernighan: ${Math.floor(wi.cost)} km`);
  });

  it('Nearest Neighbor', async () => {
    await TSPNearestNeighbor(wi).catch(handleError);
    console.log(`Nearest Neighbor: ${Math.floor(wi.cost)} km`);
  });

  it('Custom', async () => {
    const code = fs.readFileSync(require.resolve('../src/custom/nearestNeighbor'), 'utf8');
    wi.params = { code };
    await TSPCustom(wi).catch(handleError);
    console.log(`Custom: ${Math.floor(wi.cost)} km`);
  });
});

describe('France, size 2019', () => {
  let wi: WorkerInstance;
  let markers = prepareMarkers(France);

  beforeEach(() => {
    global.console = require('console');
    wi = new WorkerInstance();
    wi.performanceMode = true;
    wi.markers = [...markers];
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('2-opt First', async () => {
    console.log('\nRunning tests for France (size 2019)...\n');
    await TSP2optFirst(wi).catch(handleError);
    console.log(`2-opt First: ${Math.floor(wi.cost)} km`);
  });

  it('2-opt Best', async () => {
    await TSP2optBest(wi).catch(handleError);
    console.log(`2-opt Best: ${Math.floor(wi.cost)} km`);
  });

  it('Ant System', async () => {
    await TSPAntSystem(wi).catch(handleError);
    console.log(`Ant System: ${Math.floor(wi.cost)} km`);
  });

  it('Lin-Kernighan', async () => {
    await TSPLinKernighan(wi).catch(handleError);
    console.log(`Lin-Kernighan: ${Math.floor(wi.cost)} km`);
  });

  it('Nearest Neighbor', async () => {
    await TSPNearestNeighbor(wi).catch(handleError);
    console.log(`Nearest Neighbor: ${Math.floor(wi.cost)} km`);
  });

  it('Custom', async () => {
    const code = fs.readFileSync(require.resolve('../src/custom/nearestNeighbor'), 'utf8');
    wi.params = { code };
    await TSPCustom(wi).catch(handleError);
    console.log(`Custom: ${Math.floor(wi.cost)} km`);
  });
});
