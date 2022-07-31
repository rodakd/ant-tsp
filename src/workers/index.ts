import * as t from '~/types';
import ACOWorker from './AntColonyOptimization?worker';

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
      iterations: {
        label: 'iterations',
        type: 'number',
        default: 100,
        min: 1,
      },
    },
  },
};

export const getWorkerDefaultParams = (config: t.WorkerConfig) => {
  const params: Record<string, unknown> = {};

  for (const [paramName, paramConfig] of Object.entries(config.params)) {
    params[paramName] = paramConfig.default;
  }

  return params;
};

export { useWorker } from './useWorker';
