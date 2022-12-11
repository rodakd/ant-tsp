import * as t from '~/types';
import TSPAntSystem from './TSPAntSystem?worker';
import TSP2optFirst from './TSP2optFirst?worker';
import TSP2optBest from './TSP2optBest?worker';
import TSP3optFirst from './TSP3optFirst?worker';
import TSPNearestNeighbor from './TSPNearestNeighbor?worker';
import TSPLinKernighan from './TSPLinKernighan?worker';

export const AVAILABLE_WORKERS: Record<string, t.WorkerConfig> = {
  'Fast Ant System': {
    workerClass: TSPAntSystem,
    worker: new TSPAntSystem(),
    params: {
      exploitation: {
        label: 'exploitation',
        type: 'number',
        step: 1,
        default: 1,
        min: 1,
      },
    },
  },

  'Nearest Neighbor': {
    workerClass: TSPNearestNeighbor,
    worker: new TSPNearestNeighbor(),
  },

  '2-opt First Improvement': {
    workerClass: TSP2optFirst,
    worker: new TSP2optFirst(),
  },

  '2-opt Best Improvement': {
    workerClass: TSP2optBest,
    worker: new TSP2optBest(),
  },

  '3-opt First': {
    workerClass: TSP3optFirst,
    worker: new TSP3optFirst(),
  },

  'Lin-Kernighan': {
    workerClass: TSPLinKernighan,
    worker: new TSPLinKernighan(),
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

export const DEFAULT_WORKER_NAME = 'Fast Ant System';
export const DEFAULT_WORKER = AVAILABLE_WORKERS[DEFAULT_WORKER_NAME];
export const DEFAULT_WORKER_PARAMS = getWorkerDefaultParams(DEFAULT_WORKER);
