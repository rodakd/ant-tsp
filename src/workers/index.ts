import * as t from '~/types';
import TSPAntSystem from './TSPAntSystem?worker';
import TSP2optFirst from './TSP2optFirst?worker';
import TSP2optBest from './TSP2optBest?worker';
import TSPNearestNeighbor from './TSPNearestNeighbor?worker';
import TSPLinKernighan from './TSPLinKernighan?worker';
import TSPCustom from './TSPCustom?worker';

export const AVAILABLE_WORKERS: Record<string, t.WorkerConfig> = {
  'Fast Ant Meta Heuristic': {
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
      loops: {
        label: 'loops',
        type: 'number',
        step: 1,
        default: 2,
        min: 1,
      },
    },
  },

  'Lin-Kernighan': {
    workerClass: TSPLinKernighan,
    worker: new TSPLinKernighan(),
  },

  '2-opt Best Improvement': {
    workerClass: TSP2optBest,
    worker: new TSP2optBest(),
  },

  '2-opt First Improvement': {
    workerClass: TSP2optFirst,
    worker: new TSP2optFirst(),
  },

  'Nearest Neighbor': {
    workerClass: TSPNearestNeighbor,
    worker: new TSPNearestNeighbor(),
  },

  'Your JavaScript': {
    workerClass: TSPCustom,
    worker: new TSPCustom(),
    params: {
      code: {
        label: 'code',
        type: 'code',
        default: '',
      },
    },
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

export const DEFAULT_WORKER_NAME = 'Fast Ant Meta Heuristic';
export const DEFAULT_WORKER = AVAILABLE_WORKERS[DEFAULT_WORKER_NAME];
export const DEFAULT_WORKER_PARAMS = getWorkerDefaultParams(DEFAULT_WORKER);
