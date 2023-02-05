import * as t from '~/types';

export const AVAILABLE_WORKERS: Record<string, t.WorkerConfig> = {
  'Fast Ant Meta Heuristic': {
    workerUrl: new URL('./TSPAntSystem', import.meta.url),
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
    workerUrl: new URL('./TSPLinKernighan', import.meta.url),
  },

  '2-opt Best Improvement': {
    workerUrl: new URL('./TSP2optBest', import.meta.url),
  },

  '2-opt First Improvement': {
    workerUrl: new URL('./TSP2optFirst', import.meta.url),
  },

  '3-opt First': {
    workerUrl: new URL('./TSP3optFirst', import.meta.url),
  },

  'Nearest Neighbor': {
    workerUrl: new URL('./TSPNearestNeighbor', import.meta.url),
  },

  'Your JavaScript': {
    workerUrl: new URL('./TSPNearestNeighbor', import.meta.url),
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
