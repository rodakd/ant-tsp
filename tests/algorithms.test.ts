import { test } from '@jest/globals';
import { TSP2optFirst } from '../src/workers/Tsp2optFirst';
import { WorkerInstance } from '../src/workers/createWorker';
import { TSP2optBest } from '../src/workers/Tsp2optBest';
import { TSPAntSystem } from '../src/workers/TSPAntSystem';
import { TSPLinKernighan } from '../src/workers/TSPLinKernighan';
import { TSPNearestNeighbor } from '../src/workers/TSPNearestNeighbor';
import { Spain } from '../src/datasets/Spain';
import { Canada } from '../src/datasets/Canada';
import { Poland } from '../src/datasets/Poland';
import { prepareMarkers } from '../src/helpers';
import _ from 'lodash';
import { Marker, WorkerInterface } from '../src/types';

const jestConsole = console;

const TEST_TIMES = 30;

const ALGORITHMS = [
  { name: 'Ant System', algorithm: TSPAntSystem },
  { name: 'Lin-Kernighan', algorithm: TSPLinKernighan },
  { name: '2-opt Best', algorithm: TSP2optBest },
  { name: '2-opt First', algorithm: TSP2optFirst },
  { name: 'Nearest Neighbor', algorithm: TSPNearestNeighbor },
];

const DATASETS = [
  { name: 'Poland', markers: Poland },
  { name: 'Canada', markers: Canada },
  { name: 'Spain', markers: Spain },
];

test('Algorithms', async () => {
  global.console = require('console');
  for (const { name: datasetName, markers } of DATASETS) {
    for (const { name: algorithmName, algorithm } of ALGORITHMS) {
      console.log(`\n${datasetName} (${markers.length}) - ${algorithmName}\n`);
      await testAlgorithm(algorithm, markers);
    }
  }
  global.console = jestConsole;
});

async function testAlgorithm(
  algorithm: (app: Readonly<WorkerInterface>) => Promise<void>,
  markers: Marker[],
  params = {}
) {
  const results: { cost: number; time: number }[] = [];

  for (const idx of new Array(TEST_TIMES).fill(0).keys()) {
    const wi = new WorkerInstance();
    wi.markers = prepareMarkers(markers);
    wi.performanceMode = true;
    wi.params = params;

    const start = Date.now();
    await algorithm(wi).catch((err) => {
      if (err !== 'Stopped') {
        throw err;
      }
    });
    const time = (Date.now() - start) / 1000;
    const cost = wi.cost;

    console.log(`${idx + 1}. Cost: ${fmt(cost)} km, Time: ${time} s`);
    results.push({ cost, time });
  }

  const minTime = _.minBy(results, 'time')!.time;
  const maxTime = _.maxBy(results, 'time')!.time;
  const avgTime = results.reduce((acc, { time }) => acc + time, 0) / results.length;
  const stdDevTime = Math.sqrt(
    results.reduce((acc, { time }) => acc + Math.pow(time - avgTime, 2), 0) / results.length
  );

  const minCost = _.minBy(results, 'cost')!.cost;
  const maxCost = _.maxBy(results, 'cost')!.cost;
  const avgCost = results.reduce((acc, { cost }) => acc + cost, 0) / results.length;
  const stdDevCost = Math.sqrt(
    results.reduce((acc, { cost }) => acc + Math.pow(cost - avgCost, 2), 0) / results.length
  );

  const table = {
    minTime: fmt(minTime),
    maxTime: fmt(maxTime),
    avgTime: fmt(avgTime),
    stdDevTime: fmt(stdDevTime),
    minCost: fmt(minCost),
    maxCost: fmt(maxCost),
    avgCost: fmt(avgCost),
    stdDevCost: fmt(stdDevCost),
  };

  console.log();
  console.table(table);
}

function fmt(str: number) {
  return Number(str.toFixed(2));
}
