import * as t from '~/types';
import create from 'zustand';
import { PRESET_1 } from './constants';
import { AVAILABLE_WORKERS, DEFAULT_WORKER_NAME, getWorkerDefaultParams } from './workers';

export const useStore = create<t.Store>((set, get) => ({
  markers: PRESET_1.markers,
  bestTour: 0,
  iteration: 0,
  status: 'idle',
  settingsOpen: false,
  markerModeOn: false,
  viewState: PRESET_1.viewState,
  selectedWorker: DEFAULT_WORKER_NAME,
  worker: new AVAILABLE_WORKERS[DEFAULT_WORKER_NAME].worker(),
  params: getWorkerDefaultParams(AVAILABLE_WORKERS[DEFAULT_WORKER_NAME]),

  startRun() {
    const { status, params, markers, workerDispatch } = get();

    if (status !== 'idle' || markers.length === 0) {
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

    set({ status: 'idle', iteration: 0, bestTour: 0 });
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

  workerDispatch: (action: t.ToWorkerAction) => get().worker?.postMessage(action),
  handleWorkerAction: (action) => {
    const { status } = get();

    if (status === 'idle') {
      return;
    }

    switch (action.type) {
      case 'updateIteration':
        return set({ iteration: action.iteration });
      case 'updateBestTour':
        return set({ bestTour: action.bestTour });
    }
  },

  setMarkers: (markers) => set({ markers }),
  setBestTour: (bestTour) => set({ bestTour }),
  setViewState: (viewState) => set({ viewState }),
  setIteration: (iteration) => set({ iteration }),
  setMarkerModeOn: (markerModeOn) => set({ markerModeOn }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
}));
