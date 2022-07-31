import * as t from '~/types';

export const createWorker = <AlgoParams>(
  algorithm: (workerState: t.WorkerState, params: AlgoParams) => t.WorkerResult
) => {
  const workerState: t.WorkerState = {
    paused: false,
    running: false,
  };

  onmessage = async (event) => {
    if (!event?.data?.type) {
      return;
    }

    const { type, payload } = event.data as t.WorkerAction<AlgoParams>;

    switch (type) {
      case 'run':
        workerState.running = true;
        postMessage({ result: await algorithm(workerState, payload) });
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
