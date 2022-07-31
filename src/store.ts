import * as t from '~/types';
import create from 'zustand';
import { INITIAL_VIEWSTATE } from './constants';
import { AVAILABLE_WORKERS, getWorkerDefaultParams } from './workers';

export const useStore = create<t.Store>((set, get) => ({
  markers: [],
  bestTour: 0,
  iteration: 0,
  worker: null,
  status: 'idle',
  settingsOpen: false,
  markerModeOn: false,
  viewState: INITIAL_VIEWSTATE,
  selectedWorker: 'Ant Colony Optimization',
  params: getWorkerDefaultParams(AVAILABLE_WORKERS['Ant Colony Optimization']),

  startRun() {
    const { status, params, workerDispatch } = get();

    if (status !== 'idle') {
      return;
    }

    set({ status: 'running', markerModeOn: false, settingsOpen: false });
    workerDispatch({ type: 'run', params });
  },

  stopRun() {
    const { status, workerDispatch } = get();

    if (status === 'idle') {
      return;
    }

    set({ status: 'idle' });
    workerDispatch({ type: 'stop' });
  },

  pauseRun() {
    const { status, workerDispatch } = get();

    if (status !== 'running') {
      return;
    }

    set({ status: 'paused' });
    workerDispatch({ type: 'pause' });
  },

  resumeRun() {
    const { status, workerDispatch } = get();

    if (status !== 'paused') {
      return;
    }

    set({ status: 'running' });
    workerDispatch({ type: 'resume' });
  },

  setSelectedWorker: (selectedWorker) => {
    const workerConfig = AVAILABLE_WORKERS[selectedWorker];
    const params = getWorkerDefaultParams(workerConfig);
    const worker = new workerConfig.worker();

    get().worker?.terminate();
    set({ selectedWorker, params, worker });
  },

  setMarkers: (markers) => set({ markers }),
  setBestTour: (bestTour) => set({ bestTour }),
  setViewState: (viewState) => set({ viewState }),
  setIteration: (iteration) => set({ iteration }),
  setMarkerModeOn: (markerModeOn) => set({ markerModeOn }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  workerDispatch: (action: t.WorkerAction) => get().worker?.postMessage(action),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
}));
