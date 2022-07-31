import * as t from '~/types';

export const createWorker = (
  algorithm: (workerState: t.WorkerState, params: t.IntersectedWorkerParams) => void
) => {
  const appDispatch = (action: t.FromWorkerAction) => postMessage(action);

  const workerState: t.WorkerState = {
    paused: false,
    running: false,
    updateBestTour: (bestTour) => appDispatch({ type: 'updateBestTour', bestTour }),
    updateIteration: (iteration) => appDispatch({ type: 'updateIteration', iteration }),
  };

  onmessage = async (event) => {
    if (!event?.data?.type) {
      return;
    }

    const action = event.data as t.ToWorkerAction;

    switch (action.type) {
      case 'run':
        workerState.running = true;
        workerState.paused = false;
        await algorithm(workerState, action.params);
        break;
      case 'pause':
        workerState.paused = true;
        break;
      case 'stop':
        workerState.running = false;
        break;
      case 'resume':
        workerState.paused = false;
        break;
    }
  };
};
