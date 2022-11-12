import { useEffect } from 'react';
import { useStore } from '~/store';

export function useWorkerCommunication() {
  const worker = useStore((state) => state.worker);
  const handleWorkerAction = useStore((state) => state.handleWorkerAction);

  useEffect(() => {
    if (worker) {
      worker.onmessage = (evt) => handleWorkerAction(evt.data);
    }
  }, [worker]);
}
