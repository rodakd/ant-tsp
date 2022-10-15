import { BASE_DELAY_MS, DEFAULT_SPEED_PERCENT } from '~/constants';
import * as t from '~/types';

export const createWorker = <T extends object>(
  algorithm: (workerInterface: t.WorkerInterface<T>, params: any) => Promise<void>
) => {
  const appDispatch = (action: t.FromWorkerAction) => postMessage(action);

  const workerInterface: t.WorkerInterface<T> = {
    paused: false,
    running: false,
    bestTour: null,
    currentTour: null,
    iteration: 0,
    markers: [],
    params: {} as T,
    speedPercent: DEFAULT_SPEED_PERCENT,

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
      while (this.paused && this.running) {
        await new Promise((res) => {
          setTimeout(res, 200);
        });
      }

      const delay = BASE_DELAY_MS - (this.speedPercent / 100) * BASE_DELAY_MS;

      if (delay === 0) {
        if (workerInterface.iteration % 100 === 0) {
          await new Promise((res) => requestAnimationFrame(res));
        }
        return;
      }

      await new Promise((res) => setTimeout(res, delay));
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
        workerInterface.params = action.params as T;
        workerInterface.iteration = 0;
        workerInterface.bestTour = null;
        workerInterface.currentTour = null;
        workerInterface.speedPercent = action.speedPercent;
        await algorithm(workerInterface, action.params);
        break;
      case 'pause':
        workerInterface.paused = true;
        break;
      case 'stop':
        workerInterface.running = false;
        workerInterface.paused = false;
        break;
      case 'resume':
        workerInterface.paused = false;
        break;
      case 'changeSpeed':
        workerInterface.speedPercent = action.speedPercent;
    }
  };
};
