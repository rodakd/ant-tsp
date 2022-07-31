import * as t from '~/types';

export const createWorker = (
  algorithm: (workerState: t.WorkerState, params: t.IntersectedWorkerParams) => t.WorkerResult
) => {
  const workerState: t.WorkerState = {
    paused: false,
    running: false,
  };

  onmessage = async (event) => {
    if (!event?.data?.type) {
      return;
    }

    const data = event.data as t.WorkerAction;

    switch (data.type) {
      case 'run':
        workerState.running = true;
        postMessage({ result: await algorithm(workerState, data.params) });
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
