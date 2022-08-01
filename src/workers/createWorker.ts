import { BASE_DELAY_MS, DEFAULT_SPEED_PERCENT } from '~/constants';
import * as t from '~/types';

export const createWorker = <T extends object>(
  algorithm: (workerState: t.WorkerState<T>, params: t.IntersectedWorkerParams) => Promise<void>
) => {
  const appDispatch = (action: t.FromWorkerAction) => postMessage(action);

  const state: t.WorkerState<T> = {
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

      if (delay > 0) {
        await new Promise((res) => setTimeout(res, delay));
      }
    },
  };

  onmessage = async (event) => {
    if (!event?.data?.type) {
      return;
    }

    const action = event.data as t.ToWorkerAction;

    switch (action.type) {
      case 'run':
        state.running = true;
        state.paused = false;
        state.markers = action.markers;
        state.params = action.params as T;
        state.iteration = 0;
        state.bestTour = null;
        state.currentTour = null;
        state.speedPercent = action.speedPercent;
        await algorithm(state, action.params);
        break;
      case 'pause':
        state.paused = true;
        break;
      case 'stop':
        state.running = false;
        state.paused = false;
        break;
      case 'resume':
        state.paused = false;
        break;
      case 'changeSpeed':
        state.speedPercent = action.speedPercent;
    }
  };
};
