import * as t from '~/types';
import create from 'zustand';
import {
  DEFAULT_ITERATIONS_LIMIT,
  DEFAULT_MULTI_RUN_LIMIT,
  DEFAULT_MULTI_RUN_SUMMARY,
  DEFAULT_SPEED_PERCENT,
} from './constants';
import {
  AVAILABLE_WORKERS,
  DEFAULT_WORKER,
  DEFAULT_WORKER_NAME,
  DEFAULT_WORKER_PARAMS,
  getWorkerDefaultParams,
} from './workers';
import { notification } from 'antd';
import { DEFAULT_DATASET } from './datasets';
import { mergeWithStorage, loadStorage } from './local-storage';
import { importWorker } from './helpers';

export const useStore = create<t.Store>((set, get) => ({
  cost: 0,
  trail: null,
  iteration: 0,
  currentRun: 1,
  status: 'idle',
  bestTour: null,
  hidePath: false,
  hideChart: false,
  currentTour: null,
  datasetsOpen: true,
  settingsOpen: false,
  markerModeOn: false,
  multiRunMode: false,
  sateliteMode: false,
  bestToursHistory: [],
  performanceMode: false,
  iterationsLimitMode: false,
  multiRunSummaryOpen: false,
  params: DEFAULT_WORKER_PARAMS,
  worker: importWorker(DEFAULT_WORKER.workerUrl),
  markers: DEFAULT_DATASET.markers,
  speedPercent: DEFAULT_SPEED_PERCENT,
  selectedWorker: DEFAULT_WORKER_NAME,
  viewState: DEFAULT_DATASET.viewState,
  multiRunLimit: DEFAULT_MULTI_RUN_LIMIT,
  iterationsLimit: DEFAULT_ITERATIONS_LIMIT,
  multiRunSummary: DEFAULT_MULTI_RUN_SUMMARY,

  ...loadStorage(),

  startRun(currentRun?: number) {
    const {
      status,
      params,
      markers,
      speedPercent,
      performanceMode,
      iterationsLimit,
      iterationsLimitMode,
      workerDispatch,
    } = get();

    if (status !== 'idle' || markers.length === 0) {
      return;
    }

    set({
      status: 'running',
      markerModeOn: false,
      settingsOpen: false,
      bestToursHistory: [],
      iteration: 0,
      currentRun: currentRun || 1,
      bestTour: null,
      trail: null,
      cost: 0,
    });

    if (!currentRun) {
      set({ multiRunSummary: DEFAULT_MULTI_RUN_SUMMARY });
    }

    workerDispatch({
      type: 'run',
      params,
      markers,
      speedPercent,
      performanceMode,
      iterationsLimit: iterationsLimitMode ? iterationsLimit || 1 : null,
    });
  },

  stopRun(manual?: boolean) {
    const {
      status,
      multiRunMode,
      currentRun,
      multiRunLimit,
      bestToursHistory,
      multiRunSummary,
      performanceMode,
      selectedWorker,
      worker,
      workerDispatch,
      startRun,
    } = get();

    if (status === 'idle') {
      return;
    }

    set({
      status: 'idle',
      currentTour: null,
    });

    if (performanceMode && manual) {
      // Worker's thread might be too busy to listen for messages
      // We have to terminate it and create a new one
      worker?.terminate();
      set({
        worker: importWorker(AVAILABLE_WORKERS[selectedWorker].workerUrl),
      });
    } else {
      workerDispatch({ type: 'stop' });
    }

    if (multiRunMode && !manual) {
      const newHistories = [...multiRunSummary.bestToursHistories];
      newHistories.push([...bestToursHistory]);

      const newSummary = {
        ...multiRunSummary,
        bestToursHistories: newHistories,
      };

      set({ multiRunSummary: newSummary });

      if (currentRun < multiRunLimit) {
        return startRun(currentRun + 1);
      }

      return set({ multiRunSummaryOpen: true });
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
    const { worker } = get();
    const workerConfig = AVAILABLE_WORKERS[selectedWorker];
    const defaultParams = getWorkerDefaultParams(workerConfig);
    worker?.terminate();
    set({ selectedWorker, params: defaultParams, worker: importWorker(workerConfig.workerUrl) });
  },

  handleWorkerAction: (action) => {
    const { status, stopRun } = get();

    if (status === 'idle') {
      return;
    }

    switch (action.type) {
      case 'updateIteration':
        return set({ iteration: action.iteration });
      case 'updateBestTour': {
        return set({
          bestTour: action.bestTour,
          bestToursHistory: action.bestToursHistory,
          cost: action.cost,
        });
      }
      case 'updateTrail': {
        return set({
          trail: action.trail,
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
        set({
          bestTour: action.bestTour,
          bestToursHistory: action.bestToursHistory,
          cost: action.cost,
          iteration: action.iterations,
          currentTour: null,
          trail: null,
        });
        return stopRun();
    }
  },

  setStorage: (obj: object) => {
    mergeWithStorage(obj);
    set(obj);
  },

  setSpeed: (speedPercent) => {
    get().setStorage({ speedPercent });
    get().workerDispatch({ type: 'changeSpeed', speedPercent });
  },

  setHidePath: (hidePath) => get().setStorage({ hidePath }),
  setHideChart: (hideChart) => get().setStorage({ hideChart }),
  setMultiRunMode: (multiRunMode) => get().setStorage({ multiRunMode }),
  setDatasetsOpen: (datasetsOpen) => get().setStorage({ datasetsOpen }),
  setSateliteMode: (sateliteMode) => get().setStorage({ sateliteMode }),
  setMultiRunLimit: (multiRunLimit) => get().setStorage({ multiRunLimit }),
  setIterationsLimit: (iterationsLimit) => get().setStorage({ iterationsLimit }),
  setPerformanceMode: (performanceMode) => get().setStorage({ performanceMode }),
  setIterationsLimitMode: (iterationsLimitMode) => get().setStorage({ iterationsLimitMode }),

  setViewState: (viewState) => set({ viewState }),
  setMarkerModeOn: (markerModeOn) => set({ markerModeOn }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setMultiRunSummaryOpen: (multiRunSummaryOpen) => set({ multiRunSummaryOpen }),
  workerDispatch: (action: t.ToWorkerAction) => get().worker?.postMessage(action),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
  setMarkers: (markers) =>
    set({ markers, bestTour: null, trail: null, bestToursHistory: [], iteration: 0, cost: 0 }),
}));
