import * as t from '~/types';
import ACOWorker from './AntColonyOptimization?worker';
import Tsp2optFirst from './Tsp2optFirst?worker';
import Tsp2optBest from './Tsp2optBest?worker';
import Tsp3optFirst from './Tsp3optFirst?worker';
import LK from './LK?worker';
import NearestNeighbor from './NearestNeighbor?worker';

export const AVAILABLE_WORKERS: Record<string, t.WorkerConfig> = {
  'Ant Colony Optimization': {
    workerClass: ACOWorker,
    worker: new ACOWorker(),
    params: {
      evaporation: {
        label: 'evaporation',
        type: 'number',
        step: 0.1,
        default: 0.7,
      },
      alpha: {
        label: 'alpha',
        type: 'number',
        default: 1,
        min: 0,
      },
      beta: {
        label: 'beta',
        type: 'number',
        default: 1,
        min: 0,
      },
      qParam: {
        label: 'Q',
        type: 'number',
        default: 1,
        min: 0,
      },
      percentOfAnts: {
        label: '% of ants',
        type: 'number',
        default: 80,
        min: 1,
        max: 100,
      },
    },
  },

  'Nearest Neighbor': {
    workerClass: NearestNeighbor,
    worker: new NearestNeighbor(),
  },

  '2-opt First Improvement': {
    workerClass: Tsp2optFirst,
    worker: new Tsp2optFirst(),
  },

  '2-opt Best Improvement': {
    workerClass: Tsp2optBest,
    worker: new Tsp2optBest(),
  },

  '3-opt First': {
    workerClass: Tsp3optFirst,
    worker: new Tsp3optFirst(),
  },

  'Lin-Kernighan': {
    workerClass: LK,
    worker: new LK(),
  },
};

export const getWorkerDefaultParams = (config: t.WorkerConfig) => {
  const params = {} as any;

  if (config.params) {
    for (const [paramName, paramConfig] of Object.entries(config.params)) {
      params[paramName] = paramConfig.default;
    }
  }

  return params;
};

export const DEFAULT_WORKER_NAME = '2-opt Best Improvement';
export const DEFAULT_WORKER = AVAILABLE_WORKERS[DEFAULT_WORKER_NAME];
export const DEFAULT_WORKER_PARAMS = getWorkerDefaultParams(DEFAULT_WORKER);
