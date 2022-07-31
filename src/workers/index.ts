import * as t from '~/types';
import ACOWorker from './AntColonyOptimization?worker';
import NearestNeighborWorker from './NearestNeighbor?worker';
import TwoOpt from './TwoOpt?worker';

export const AVAILABLE_WORKERS: Record<string, t.WorkerConfig> = {
  'Ant Colony Optimization': {
    worker: ACOWorker,
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
    worker: NearestNeighborWorker,
  },

  '2-opt': {
    worker: TwoOpt,
  },
};

export const DEFAULT_WORKER_NAME = 'Ant Colony Optimization';

export const getWorkerDefaultParams = (config: t.WorkerConfig) => {
  const params = {} as t.IntersectedWorkerParams;

  if (config.params) {
    for (const [paramName, paramConfig] of Object.entries(config.params)) {
      params[paramName as keyof t.IntersectedWorkerParams] = paramConfig.default;
    }
  }

  return params;
};
