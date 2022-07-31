import { ITERATION_DELAY_MS } from '~/constants';
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
      await new Promise((res) => setTimeout(res, ITERATION_DELAY_MS));
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
    }
  };
};
