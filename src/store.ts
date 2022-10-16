import * as t from '~/types';
import create from 'zustand';
import { DEFAULT_SPEED_PERCENT, PRESET_1 } from './constants';
import { AVAILABLE_WORKERS, DEFAULT_WORKER_NAME, getWorkerDefaultParams } from './workers';
import { cost } from './helpers';

export const useStore = create<t.Store>((set, get) => ({
  iteration: 0,
  status: 'idle',
  bestTour: null,
  bestToursHistory: [],
  currentTour: null,
  settingsOpen: false,
  markerModeOn: false,
  markers: PRESET_1.markers,
  viewState: PRESET_1.viewState,
  speedPercent: DEFAULT_SPEED_PERCENT,
  selectedWorker: DEFAULT_WORKER_NAME,
  worker: new AVAILABLE_WORKERS[DEFAULT_WORKER_NAME].worker(),
  params: getWorkerDefaultParams(AVAILABLE_WORKERS[DEFAULT_WORKER_NAME]),

  startRun() {
    const { status, params, markers, speedPercent, workerDispatch } = get();

    if (status !== 'idle' || markers.length === 0) {
      return;
    }

    set({
      status: 'running',
      markerModeOn: false,
      settingsOpen: false,
      bestToursHistory: [],
      iteration: 0,
      bestTour: null,
    });

    workerDispatch({ type: 'run', params, markers, speedPercent });
  },

  stopRun() {
    const { status, workerDispatch } = get();

    if (status === 'idle') {
      return;
    }

    set({
      status: 'idle',
      currentTour: null,
    });

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

  setSpeed: (speedPercent) => {
    set({ speedPercent });
    get().workerDispatch({ type: 'changeSpeed', speedPercent });
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
      case 'updateBestTour': {
        const { bestToursHistory, iteration } = get();
        return set({
          bestTour: action.bestTour,
          bestToursHistory: bestToursHistory.concat({
            cost: Number(cost(action.bestTour).toFixed(2)),
            iteration,
          }),
        });
      }
      case 'updateCurrentTour':
        return set({ currentTour: action.currentTour });
      case 'log':
        return console.log(action.toLog);
      case 'finish':
        return get().stopRun();
    }
  },
  setMarkers: (markers) => set({ markers, bestTour: null, bestToursHistory: [] }),
  setViewState: (viewState) => set({ viewState }),
  setMarkerModeOn: (markerModeOn) => set({ markerModeOn }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
}));
