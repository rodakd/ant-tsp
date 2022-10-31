import * as t from '~/types';
import create from 'zustand';
import { DEFAULT_DATASET, DEFAULT_SPEED_PERCENT } from './constants';
import { AVAILABLE_WORKERS, DEFAULT_WORKER_NAME, getWorkerDefaultParams } from './workers';
import { cost } from './helpers';
import { notification } from 'antd';

export const useStore = create<t.Store>((set, get) => ({
  iteration: 0,
  currentRun: 1,
  status: 'idle',
  bestTour: null,
  hideChart: false,
  bestToursHistory: [],
  currentTour: null,
  settingsOpen: false,
  datasetsOpen: true,
  markerModeOn: false,
  markers: DEFAULT_DATASET.markers,
  viewState: DEFAULT_DATASET.viewState,
  speedPercent: DEFAULT_SPEED_PERCENT,
  selectedWorker: DEFAULT_WORKER_NAME,
  worker: null,
  performanceMode: false,
  multiRunMode: false,
  iterationsLimitMode: false,
  multiRunLimit: 10,
  iterationsLimit: 100,
  params: getWorkerDefaultParams(AVAILABLE_WORKERS[DEFAULT_WORKER_NAME]),

  startRun(currentRun?: number) {
    const { status, params, markers, speedPercent, selectedWorker, worker, performanceMode } =
      get();

    if (status !== 'idle' || markers.length === 0) {
      return;
    }

    worker?.terminate();
    const freshWorker = new AVAILABLE_WORKERS[selectedWorker].worker();

    set({
      status: 'running',
      markerModeOn: false,
      settingsOpen: false,
      datasetsOpen: false,
      bestToursHistory: [],
      iteration: 0,
      currentRun: currentRun || 1,
      bestTour: null,
      worker: freshWorker,
    });

    freshWorker.postMessage({ type: 'run', params, markers, speedPercent, performanceMode });
  },

  stopRun() {
    const { status, worker, multiRunMode, currentRun, multiRunLimit, startRun } = get();

    if (status === 'idle') {
      return;
    }

    set({
      status: 'idle',
      currentTour: null,
    });

    worker?.terminate();

    console.log(multiRunMode, currentRun, multiRunLimit);
    if (multiRunMode) {
      if (currentRun < multiRunLimit) {
        return startRun(currentRun + 1);
      }
    }
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
    const { status, bestToursHistory, iteration, iterationsLimitMode, iterationsLimit, stopRun } =
      get();

    if (status === 'idle') {
      return;
    }

    switch (action.type) {
      case 'updateIteration':
        set({ iteration: action.iteration });
        if (iterationsLimitMode && action.iteration >= iterationsLimit) {
          return stopRun();
        }
        return;
      case 'updateBestTour': {
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
      case 'error':
        notification.error({
          message: 'An error occurred',
          description: action.text || 'Please check the console',
        });
        return stopRun();
      case 'end':
        return stopRun();
    }
  },
  setIterationsLimitMode: (iterationsLimitMode) => set({ iterationsLimitMode }),
  setMultiRunMode: (multiRunMode) => set({ multiRunMode }),
  setIterationsLimit: (iterationsLimit) => set({ iterationsLimit }),
  setMultiRunLimit: (multiRunLimit) => set({ multiRunLimit }),
  setHideChart: (hideChart) => set({ hideChart }),
  setPerformanceMode: (performanceMode) => set({ performanceMode }),
  setMarkers: (markers) => set({ markers, bestTour: null, bestToursHistory: [] }),
  setViewState: (viewState) => set({ viewState }),
  setMarkerModeOn: (markerModeOn) => set({ markerModeOn }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setDatasetsOpen: (datasetsOpen) => set({ datasetsOpen }),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
}));
