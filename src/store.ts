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
import { cost } from './helpers';
import { notification } from 'antd';
import { DEFAULT_DATASET } from './datasets';

export const useStore = create<t.Store>((set, get) => ({
  iteration: 0,
  currentRun: 1,
  status: 'idle',
  bestTour: null,
  hideChart: false,
  currentTour: null,
  datasetsOpen: true,
  settingsOpen: false,
  markerModeOn: false,
  multiRunMode: false,
  bestToursHistory: [],
  performanceMode: false,
  iterationsLimitMode: false,
  multiRunSummaryOpen: false,
  params: DEFAULT_WORKER_PARAMS,
  worker: DEFAULT_WORKER.worker,
  markers: DEFAULT_DATASET.markers,
  speedPercent: DEFAULT_SPEED_PERCENT,
  selectedWorker: DEFAULT_WORKER_NAME,
  viewState: DEFAULT_DATASET.viewState,
  multiRunLimit: DEFAULT_MULTI_RUN_LIMIT,
  iterationsLimit: DEFAULT_ITERATIONS_LIMIT,
  multiRunSummary: DEFAULT_MULTI_RUN_SUMMARY,

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
      datasetsOpen: false,
      bestToursHistory: [],
      iteration: 0,
      currentRun: currentRun || 1,
      bestTour: null,
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
      const config = AVAILABLE_WORKERS[selectedWorker];
      config.worker?.terminate();
      config.worker = new config.workerClass();
      set({
        worker: config.worker,
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
    const workerConfig = AVAILABLE_WORKERS[selectedWorker];
    const defaultParams = getWorkerDefaultParams(workerConfig);
    set({ selectedWorker, params: defaultParams, worker: workerConfig.worker });
  },

  setSpeed: (speedPercent) => {
    set({ speedPercent });
    get().workerDispatch({ type: 'changeSpeed', speedPercent });
  },

  handleWorkerAction: (action) => {
    const { status, bestToursHistory, iteration, stopRun } = get();

    if (status === 'idle') {
      return;
    }

    switch (action.type) {
      case 'updateIteration':
        return set({ iteration: action.iteration });
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

  setViewState: (viewState) => set({ viewState }),
  setHideChart: (hideChart) => set({ hideChart }),
  setMultiRunMode: (multiRunMode) => set({ multiRunMode }),
  setMarkerModeOn: (markerModeOn) => set({ markerModeOn }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setDatasetsOpen: (datasetsOpen) => set({ datasetsOpen }),
  setMultiRunLimit: (multiRunLimit) => set({ multiRunLimit }),
  setIterationsLimit: (iterationsLimit) => set({ iterationsLimit }),
  setPerformanceMode: (performanceMode) => set({ performanceMode }),
  setIterationsLimitMode: (iterationsLimitMode) => set({ iterationsLimitMode }),
  setMultiRunSummaryOpen: (multiRunSummaryOpen) => set({ multiRunSummaryOpen }),
  workerDispatch: (action: t.ToWorkerAction) => get().worker?.postMessage(action),
  setParams: (params) => set((state) => ({ params: { ...state.params, ...params } })),
  setMarkers: (markers) => set({ markers, bestTour: null, bestToursHistory: [], iteration: 0 }),
}));
