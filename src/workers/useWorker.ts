import * as t from '~/types';
import { useEffect, useState } from 'react';
import { AVAILABLE_WORKERS } from '.';

export const useWorker = (workerName: keyof typeof AVAILABLE_WORKERS) => {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setWorker(new AVAILABLE_WORKERS[workerName].worker());
    return () => worker?.terminate();
  }, [workerName]);

  const workerDispatch = (action: t.WorkerAction<unknown>) => {
    worker?.postMessage(action);
  };

  return workerDispatch;
};
