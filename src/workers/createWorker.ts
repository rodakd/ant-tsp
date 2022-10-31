import _ from 'lodash';
import { BASE_DELAY_MS, DEFAULT_SPEED_PERCENT } from '../constants';
import { cost } from '../helpers';
import * as t from '../types';

export const createWorker = (
  algorithm: (workerInterface: t.WorkerInterface, params: any) => Promise<void>
) => {
  const appDispatch = (action: t.FromWorkerAction) => postMessage(action);

  const workerInterface: t.WorkerInterface = {
    paused: false,
    running: false,
    bestTour: null,
    currentTour: null,
    iteration: 0,
    markers: [],
    params: {},
    speedPercent: DEFAULT_SPEED_PERCENT,
    performanceMode: false,

    updateBestTour: function (bestTour) {
      this.bestTour = bestTour;
      appDispatch({ type: 'updateBestTour', bestTour });
    },

    updateIteration: function (iteration) {
      this.iteration = iteration;
      appDispatch({ type: 'updateIteration', iteration });
    },

    updateCurrentTour: function (currentTour) {
      this.currentTour = currentTour;
      appDispatch({ type: 'updateCurrentTour', currentTour });
    },

    sleep: async function () {
      if (this.performanceMode) {
        return;
      }

      while (this.paused && this.running) {
        await new Promise((res) => {
          setTimeout(res, 200);
        });
      }

      const delay = BASE_DELAY_MS - (this.speedPercent / 100) * BASE_DELAY_MS;
      await new Promise((res) => setTimeout(res, delay));
    },

    log: function (toLog: any) {
      if (_.isPlainObject(toLog)) {
        toLog = JSON.stringify(toLog, null, '\t');
      }
      appDispatch({ type: 'log', toLog });
    },

    error: function (text?: string) {
      appDispatch({ type: 'error', text });
    },

    calculateCost: function (path: t.Marker[] | null) {
      return cost(path);
    },

    end: function () {
      appDispatch({ type: 'end' });
    },
  };

  onmessage = async (event) => {
    if (!event?.data?.type) {
      return;
    }

    const action = event.data as t.ToWorkerAction;

    switch (action.type) {
      case 'run':
        workerInterface.running = true;
        workerInterface.paused = false;
        workerInterface.markers = action.markers;
        workerInterface.params = action.params;
        workerInterface.iteration = 0;
        workerInterface.bestTour = null;
        workerInterface.currentTour = null;
        workerInterface.speedPercent = action.speedPercent;
        workerInterface.performanceMode = action.performanceMode;
        await algorithm(workerInterface, action.params);
        break;
      case 'pause':
        workerInterface.paused = true;
        break;
      case 'resume':
        workerInterface.paused = false;
        break;
      case 'changeSpeed':
        workerInterface.speedPercent = action.speedPercent;
    }
  };
};
